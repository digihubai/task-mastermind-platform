
import { useState, useCallback } from "react";

export interface FlowNode {
  id: string;
  type: string;
  position?: { x: number; y: number };
  [key: string]: any;
}

export interface FlowEdge {
  id: string;
  source: string;
  target: string;
  sourceHandle?: string;
}

export interface ConnectionOptions {
  /**
   * Optional validation logic for connections
   */
  validateConnection?: (source: string, target: string) => boolean;
  /**
   * Optional handler that runs after a connection is added
   */
  onConnectionAdded?: (source: string, target: string, edge: FlowEdge) => void;
  /**
   * Optional handler that runs after a connection is removed
   */
  onConnectionRemoved?: (source: string, target: string) => void;
}

/**
 * Hook for managing connections between nodes in a flow diagram
 */
export function useFlowConnections<
  NodeType extends FlowNode = FlowNode,
  EdgeType extends FlowEdge = FlowEdge
>(initialEdges: EdgeType[] = [], options?: ConnectionOptions) {
  const [edges, setEdges] = useState<EdgeType[]>(initialEdges);

  /**
   * Adds a new connection between nodes
   */
  const handleAddConnection = useCallback((source: string, target: string, sourceHandle?: string) => {
    // Don't create a connection to itself
    if (source === target) return;

    // Check if connection already exists
    const connectionExists = edges.some(
      edge => edge.source === source && edge.target === target && 
      (sourceHandle ? edge.sourceHandle === sourceHandle : true)
    );
    if (connectionExists) return;

    // Validate connection if validation function exists
    if (options?.validateConnection && !options.validateConnection(source, target)) {
      return;
    }

    // Create a new edge
    const newEdge: FlowEdge = {
      id: `${source}-${target}${sourceHandle ? `-${sourceHandle}` : ''}`,
      source,
      target,
      ...(sourceHandle ? { sourceHandle } : {})
    };

    setEdges(prev => [...prev, newEdge as EdgeType]);

    // Call the onConnectionAdded handler if provided
    if (options?.onConnectionAdded) {
      options.onConnectionAdded(source, target, newEdge);
    }
  }, [edges, options]);

  /**
   * Removes a connection between nodes
   */
  const handleRemoveConnection = useCallback((source: string, target: string, sourceHandle?: string) => {
    setEdges(prev => {
      const filtered = prev.filter(edge => !(
        edge.source === source && 
        edge.target === target && 
        (sourceHandle ? edge.sourceHandle === sourceHandle : true)
      ));
      
      // Only trigger onConnectionRemoved if we actually removed an edge
      if (filtered.length < prev.length && options?.onConnectionRemoved) {
        options.onConnectionRemoved(source, target);
      }
      
      return filtered;
    });
  }, [options]);

  /**
   * Updates edges based on new nodes (useful for handling node removals)
   */
  const updateEdgesOnNodeChange = useCallback((nodes: FlowNode[]) => {
    const nodeIds = nodes.map(node => node.id);
    setEdges(prev => prev.filter(
      edge => nodeIds.includes(edge.source) && nodeIds.includes(edge.target)
    ));
  }, []);

  /**
   * Bulk set edges (useful for initial loading)
   */
  const setAllEdges = useCallback((newEdges: EdgeType[]) => {
    setEdges(newEdges);
  }, []);

  /**
   * Gets all connections from a specific node
   */
  const getConnectionsFromNode = useCallback((nodeId: string) => {
    return edges.filter(edge => edge.source === nodeId);
  }, [edges]);

  /**
   * Gets all connections to a specific node
   */
  const getConnectionsToNode = useCallback((nodeId: string) => {
    return edges.filter(edge => edge.target === nodeId);
  }, [edges]);

  return {
    edges,
    handleAddConnection,
    handleRemoveConnection,
    updateEdgesOnNodeChange,
    setAllEdges,
    getConnectionsFromNode,
    getConnectionsToNode
  };
}
