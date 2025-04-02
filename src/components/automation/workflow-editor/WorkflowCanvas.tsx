
import React, { useRef, useEffect } from "react";
import { 
  ReactFlow, 
  Background, 
  Controls,
  MarkerType,
  Connection,
  ConnectionLineType,
  useReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  Position,
  XYPosition,
  Node,
  Edge 
} from "reactflow";
import "reactflow/dist/style.css";

import { WorkflowStep } from "@/hooks/use-workflow-editor";
import TriggerNode from "./nodes/TriggerNode";
import ActionNode from "./nodes/ActionNode";
import ConditionNode from "./nodes/ConditionNode";
import DelayNode from "./nodes/DelayNode";
import IntegrationNode from "./nodes/IntegrationNode";
import { useFlowConnections } from "@/hooks/use-flow-connections";

const nodeTypes = {
  trigger: TriggerNode,
  action: ActionNode,
  condition: ConditionNode,
  delay: DelayNode,
  integration: IntegrationNode
};

interface WorkflowCanvasProps {
  steps: WorkflowStep[];
  connections: {from: string, to: string}[];
  selectedStepId: string | null;
  onSelectStep: (id: string | null) => void;
  onAddStep: (type: WorkflowStep['type'], afterStepId?: string) => string;
  onConnect: (fromId: string, toId: string, branchIndex?: number) => void;
  onDisconnect: (fromId: string, toId: string) => void;
  onUpdateStepPosition: (id: string, position: XYPosition) => void;
}

const WorkflowCanvas = ({ 
  steps, 
  connections,
  selectedStepId,
  onSelectStep,
  onAddStep,
  onConnect,
  onDisconnect,
  onUpdateStepPosition 
}: WorkflowCanvasProps) => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { project } = useReactFlow();
  
  // Convert workflow steps to ReactFlow nodes
  const initialNodes: Node[] = steps.map((step) => {
    // For positioning, start from top and move down
    // This is just an initial position if not already defined
    const position = step.position || {
      x: step.type === 'trigger' ? 250 : (Math.random() * 300) + 150,
      y: step.type === 'trigger' ? 50 : (steps.indexOf(step) * 100) + 150
    };
    
    return {
      id: step.id,
      type: step.type,
      position,
      data: { 
        ...step,
        selected: selectedStepId === step.id,
        onAddStep
      }
    };
  });
  
  // Convert connections to ReactFlow edges
  const initialEdges: Edge[] = connections.map((conn) => {
    // Find if this comes from a condition branch
    const sourceStep = steps.find(s => s.id === conn.from);
    let sourceHandle: string | undefined = undefined;
    
    if (sourceStep?.type === 'condition' && sourceStep.branches) {
      // If it's a condition, find which branch this connection belongs to
      const branchIndex = sourceStep.branches.findIndex(branch => 
        branch.nextStepId === conn.to
      );
      
      if (branchIndex >= 0) {
        sourceHandle = `branch-${branchIndex}`;
      }
    }
    
    return {
      id: `edge-${conn.from}-${conn.to}`,
      source: conn.from,
      target: conn.to,
      sourceHandle,
      type: 'smoothstep',
      animated: true,
      style: { stroke: '#555', strokeWidth: 2 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: '#555',
      }
    };
  });

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  
  // Update nodes and edges when steps or connections change
  useEffect(() => {
    setNodes(
      steps.map(step => ({
        id: step.id,
        type: step.type,
        position: step.position || { 
          x: step.type === 'trigger' ? 250 : (Math.random() * 300) + 150,
          y: step.type === 'trigger' ? 50 : (steps.indexOf(step) * 100) + 150
        },
        data: { 
          ...step,
          selected: selectedStepId === step.id,
          onAddStep
        }
      }))
    );
    
    setEdges(connections.map((conn) => {
      // Find if this comes from a condition branch
      const sourceStep = steps.find(s => s.id === conn.from);
      let sourceHandle: string | undefined = undefined;
      
      if (sourceStep?.type === 'condition' && sourceStep.branches) {
        // If it's a condition, find which branch this connection belongs to
        const branchIndex = sourceStep.branches.findIndex(branch => 
          branch.nextStepId === conn.to
        );
        
        if (branchIndex >= 0) {
          sourceHandle = `branch-${branchIndex}`;
        }
      }
      
      return {
        id: `edge-${conn.from}-${conn.to}`,
        source: conn.from,
        target: conn.to,
        sourceHandle,
        type: 'smoothstep',
        animated: true,
        style: { stroke: '#555', strokeWidth: 2 },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: '#555',
        }
      };
    }));
  }, [steps, connections, selectedStepId, onAddStep, setNodes, setEdges]);

  // Handle node selections
  const onNodeClick = (_: React.MouseEvent, node: Node) => {
    onSelectStep(node.id);
  };
  
  // Handle canvas click to deselect
  const onPaneClick = () => {
    onSelectStep(null);
  };
  
  // Handle node drag to update positions
  const onNodeDragStop = (_: React.MouseEvent, node: Node) => {
    onUpdateStepPosition(node.id, node.position);
  };
  
  // Handle new connections
  const handleConnect = (params: Connection) => {
    if (params.source && params.target) {
      let branchIndex: number | undefined = undefined;
      
      // Check if connection is from a specific branch of a condition
      if (params.sourceHandle && params.sourceHandle.startsWith('branch-')) {
        branchIndex = parseInt(params.sourceHandle.split('-')[1]);
      }
      
      onConnect(params.source, params.target, branchIndex);
    }
  };
  
  // Handle edge removal
  const onEdgeClick = (_: React.MouseEvent, edge: Edge) => {
    if (window.confirm('Remove this connection?')) {
      onDisconnect(edge.source, edge.target);
    }
  };

  // Add a new step where clicked on the canvas
  const onAddNodeClick = (event: React.MouseEvent) => {
    if (reactFlowWrapper.current) {
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const position = project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      
      // Add a new action step at the clicked position
      const newStepId = onAddStep('action');
      
      // Update its position
      onUpdateStepPosition(newStepId, position);
      
      // Select the new node
      onSelectStep(newStepId);
    }
  };

  return (
    <div className="col-span-4 bg-card rounded-xl border border-border/40 overflow-hidden" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={handleConnect}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        onNodeDragStop={onNodeDragStop}
        onEdgeClick={onEdgeClick}
        onDoubleClick={onAddNodeClick}
        nodeTypes={nodeTypes}
        defaultEdgeOptions={{
          type: 'smoothstep',
          animated: true,
          markerEnd: {
            type: MarkerType.ArrowClosed,
          },
        }}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        deleteKeyCode={['Backspace', 'Delete']}
        multiSelectionKeyCode={['Control', 'Meta']}
        selectionKeyCode={['Shift']}
      >
        <Background color="#aaa" gap={16} />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default WorkflowCanvas;
