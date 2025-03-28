
export const generateMockOutlines = (title: string, topic: string = "", keywords: string[] = []) => {
  // Format keywords for better readability in the outline
  const keywordList = keywords.length > 0 
    ? keywords.map(k => `- ${k.charAt(0).toUpperCase() + k.slice(1)}`).join('\n') 
    : '- No keywords selected';
  
  // Extract the main subject from the title or use the topic
  const mainSubject = topic || title.split(' ').slice(0, 3).join(' ');
  const firstKeyword = keywords[0] || mainSubject;
  const secondKeyword = keywords.length > 1 ? keywords[1] : mainSubject;
  
  const currentYear = new Date().getFullYear();
  const nextYear = currentYear + 1;
  
  const outlines = [
    // First outline format - Problem/Solution with relevant keywords
    `# ${title}

## Introduction to ${mainSubject} and Its Importance
- Overview of what ${firstKeyword} is and why it matters
- Current state of ${mainSubject} in ${currentYear}
- Key challenges businesses face without proper ${secondKeyword} implementation

## Common Challenges with Implementing ${firstKeyword}
- Technical barriers to adoption
- Integration issues with existing systems
- Cost considerations and ROI challenges
- Skill gaps and training requirements

## Key Benefits of Using ${firstKeyword} for Business Growth
- Improved customer engagement metrics
- Cost savings and operational efficiencies
- Competitive advantages in the marketplace
- Real-world success statistics

## How ${secondKeyword} Enhances Customer Experience
- Personalization capabilities
- Response time improvements
- 24/7 availability benefits
- Customer satisfaction metrics and improvements

## Step-by-Step Implementation Process
- Planning and strategy development
- Vendor selection criteria
- Technical setup and integration
- Testing and quality assurance
- Launch and monitoring

## Case Study: Companies Achieving 35%+ Conversion Rate Increase
- B2B implementation example
- E-commerce success story
- Service industry transformation
- Before/after metrics analysis

## Measuring ROI and Performance Metrics
- Key performance indicators to track
- Attribution models for ${firstKeyword}
- Dashboard setup and monitoring
- Improvement iteration process

## Best Practices for Optimizing ${mainSubject}
- Content strategy alignment
- Technical optimization techniques
- Integration with marketing automation
- Continuous improvement framework

## Common Pitfalls to Avoid When Deploying ${firstKeyword}
- Over-automation risks
- Customer experience disconnects
- Data security considerations
- Scalability challenges

## Future Trends in ${mainSubject} for ${nextYear}
- Emerging technologies to watch
- Integration with other marketing technologies
- AI and machine learning advancements
- Industry predictions from experts

## Conclusion: Taking Your ${mainSubject} Strategy to the Next Level
- Strategic recommendations
- Next steps for implementation
- Resources for ongoing education
- Final thoughts and recommendations`,
    
    // Second outline format - Guide/How-To with specific implementations
    `# ${title}

## Understanding ${mainSubject} in ${currentYear}
- Definition and scope of ${firstKeyword}
- Historical development and recent advances
- Key market players and solutions
- Statistics on adoption and effectiveness

## The Evolution of ${firstKeyword} Technology
- First generation capabilities and limitations
- Current technology landscape
- Recent breakthroughs and innovations
- Comparison of approaches and methodologies

## Essential Components of an Effective ${secondKeyword} System
- Core architectural elements
- Key features for business success
- Integration requirements
- Security and compliance considerations

## Step-by-Step Implementation Guide with Code Examples
- Planning and requirements gathering
- Solution architecture design
- Technical implementation walkthrough
- Testing and quality assurance procedures
- Documentation and knowledge transfer

## Integration Strategies with CRM and Marketing Platforms
- Salesforce integration approach
- HubSpot connector implementation
- Marketing automation platform connections
- Data synchronization strategies

## Advanced ${firstKeyword} Features That Drive Conversions
- Personalization algorithms
- Behavioral trigger implementation
- A/B testing frameworks
- Predictive analytics capabilities

## Data Privacy and Compliance Considerations
- GDPR requirements and implementation
- CCPA compliance framework
- Industry-specific regulations
- Privacy by design principles

## Measuring Success: KPIs for ${mainSubject} Performance
- Conversion metrics framework
- Engagement measurement approach
- Revenue attribution models
- Customer lifetime value impact

## User Experience Design for Optimal ${firstKeyword} Engagement
- Interface design principles
- User journey mapping
- Friction point identification and resolution
- Accessibility considerations

## Case Studies: How Industry Leaders Use ${secondKeyword}
- Technology sector example
- E-commerce implementation
- B2B application case study
- Service industry transformation

## Future-Proofing Your ${mainSubject} Investment
- Scalability planning
- Technology evolution roadmap
- Team capability development
- Competitive differentiation strategies`,
    
    // Third outline format - Research/Analysis with data focus
    `# ${title}

## The Current State of ${mainSubject} Technology
- Market size and growth analysis
- Vendor landscape assessment
- Technology adoption rates
- Investment trends and funding analysis

## Research Methodology: Analyzing ${firstKeyword} Performance
- Data collection approach
- Measurement framework
- Analysis techniques
- Validation methodologies

## Key Findings: What Makes ${secondKeyword} Convert at 35%+
- Critical success factors
- Performance variables correlation
- Implementation characteristics
- User experience elements

## User Behavior Analysis When Interacting with ${firstKeyword}
- User journey mapping results
- Engagement patterns
- Friction point identification
- Behavioral segmentation insights

## Competitive Analysis of Top ${mainSubject} Solutions
- Feature comparison matrix
- Pricing model assessment
- Performance benchmarking
- Customer satisfaction analysis

## Technical Architecture of High-Performing ${secondKeyword} Systems
- Component architecture analysis
- Integration approaches comparison
- Scalability characteristics
- Performance optimization techniques

## ROI Analysis: Cost vs. Revenue Impact
- Implementation cost breakdown
- Operational expense analysis
- Revenue impact assessment
- Payback period calculation
- Long-term value projection

## Implementation Timeline and Resource Requirements
- Project planning framework
- Resource allocation guide
- Critical path identification
- Risk mitigation strategies

## Data Security and Compliance Framework
- Security architecture requirements
- Data handling protocols
- Regulatory compliance approach
- Audit and monitoring systems

## Strategic Recommendations Based on Industry Benchmarks
- Implementation approach recommendations
- Technology selection criteria
- Operational best practices
- Growth strategy alignment

## Conclusion: Implementing These Findings in Your Business
- Action plan development
- Prioritization framework
- Success measurement approach
- Continuous improvement methodology`
  ];
  
  return outlines;
};
