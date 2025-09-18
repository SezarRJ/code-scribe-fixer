// AI Prompt Templates for Code Analysis Platform

export interface PromptTemplate {
  id: string;
  name: string;
  category: 'analysis' | 'fix' | 'learning';
  template: string;
  description: string;
}

export const PROMPT_TEMPLATES: PromptTemplate[] = [
  {
    id: 'code-analysis',
    name: 'Code Analysis',
    category: 'analysis',
    description: 'Comprehensive code analysis for bugs, security, and performance',
    template: `You are a senior software engineer specializing in security and performance. Your task is to analyze the following {language} code for any potential bugs, security vulnerabilities, or performance bottlenecks.

Provide a detailed report of all issues found, categorized by severity (High, Medium, Low). For each issue, provide:
1. Clear explanation of the problem
2. Reference to the relevant code block
3. Potential impact on the application
4. Recommended fix or mitigation

Code to analyze:
{code}

Format your response as JSON with this structure:
{
  "summary": "Brief overview of findings",
  "issues": [
    {
      "type": "security|performance|logic|syntax|style",
      "severity": "high|medium|low",
      "line": number,
      "column": number,
      "message": "Issue description",
      "explanation": "Detailed explanation",
      "impact": "Potential impact",
      "suggestion": "Recommended fix"
    }
  ],
  "metrics": {
    "complexity": number,
    "maintainability": "excellent|good|fair|poor",
    "riskLevel": "high|medium|low"
  }
}`
  },
  {
    id: 'fix-generation',
    name: 'Fix Generation',
    category: 'fix',
    description: 'Generate corrected code with explanations',
    template: `The following {language} code snippet has a known bug: {bugDescription}

Your task is to provide the corrected code. In your response, provide:
1. The corrected code snippet
2. A brief explanation of the fix
3. Why the original code was faulty

Original code:
{code}

Format your response as JSON:
{
  "fixedCode": "The corrected code",
  "explanation": "Brief explanation of the fix",
  "reasoning": "Why the original code was faulty",
  "preventionTips": "How to avoid this issue in the future"
}`
  },
  {
    id: 'self-learning',
    name: 'Self-Learning Pattern',
    category: 'learning',
    description: 'Extract patterns for model training',
    template: `The original code snippet contained a bug that was successfully fixed by this corrected code. Your task is to identify the bug pattern and the successful fix pattern.

Original code:
{originalCode}

Fixed code:
{fixedCode}

Store this information in the following JSON format:
{
  "bugType": "Identify the specific bug type",
  "originalPattern": "Key problematic code pattern",
  "fixPattern": "Key corrected code pattern", 
  "explanation": "Brief explanation of why the fix works",
  "language": "{language}",
  "severity": "high|medium|low",
  "category": "security|performance|logic|syntax|style",
  "learningPoints": [
    "Key learning point 1",
    "Key learning point 2"
  ]
}`
  },
  {
    id: 'security-focused',
    name: 'Security Analysis',
    category: 'analysis',
    description: 'Specialized security vulnerability detection',
    template: `You are a cybersecurity expert performing a security audit. Analyze the following {language} code for security vulnerabilities only.

Focus on:
- Injection attacks (SQL, NoSQL, Command, etc.)
- Authentication and authorization flaws
- Sensitive data exposure
- XML External Entities (XXE)
- Broken access control
- Security misconfiguration
- Cross-site scripting (XSS)
- Insecure deserialization
- Components with known vulnerabilities
- Insufficient logging and monitoring

Code to analyze:
{code}

Provide detailed security assessment in JSON format:
{
  "securityScore": "1-10 scale",
  "riskLevel": "critical|high|medium|low",
  "vulnerabilities": [
    {
      "type": "OWASP category",
      "severity": "critical|high|medium|low|info",
      "line": number,
      "description": "Vulnerability description",
      "exploitation": "How this could be exploited",
      "mitigation": "Specific mitigation steps",
      "references": ["OWASP link", "CVE if applicable"]
    }
  ],
  "recommendations": [
    "Security improvement recommendations"
  ]
}`
  },
  {
    id: 'performance-analysis',
    name: 'Performance Analysis',
    category: 'analysis',
    description: 'Specialized performance optimization analysis',
    template: `You are a performance optimization expert. Analyze the following {language} code for performance bottlenecks and optimization opportunities.

Focus on:
- Time complexity issues
- Memory usage optimization
- Database query optimization
- Caching opportunities
- Async/await usage
- Resource management
- Algorithm efficiency
- Scalability concerns

Code to analyze:
{code}

Provide performance analysis in JSON format:
{
  "performanceScore": "1-10 scale",
  "complexity": {
    "time": "O(n) notation",
    "space": "O(n) notation"
  },
  "bottlenecks": [
    {
      "type": "cpu|memory|io|network",
      "severity": "high|medium|low",
      "line": number,
      "description": "Performance issue description",
      "impact": "Performance impact",
      "optimization": "Specific optimization suggestion",
      "estimatedImprovement": "Expected performance gain"
    }
  ],
  "optimizations": [
    "General optimization recommendations"
  ]
}`
  }
];

export class PromptBuilder {
  static buildPrompt(templateId: string, variables: Record<string, string>): string {
    const template = PROMPT_TEMPLATES.find(t => t.id === templateId);
    if (!template) {
      throw new Error(`Template with id '${templateId}' not found`);
    }

    let prompt = template.template;
    
    // Replace variables in the template
    Object.entries(variables).forEach(([key, value]) => {
      const placeholder = `{${key}}`;
      prompt = prompt.replace(new RegExp(placeholder, 'g'), value);
    });

    return prompt;
  }

  static getTemplatesByCategory(category: 'analysis' | 'fix' | 'learning'): PromptTemplate[] {
    return PROMPT_TEMPLATES.filter(t => t.category === category);
  }

  static getAllTemplates(): PromptTemplate[] {
    return PROMPT_TEMPLATES;
  }
}

// Example usage:
// const analysisPrompt = PromptBuilder.buildPrompt('code-analysis', {
//   language: 'Python',
//   code: 'def vulnerable_function(user_input): ...'
// });