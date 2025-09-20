import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  MessageSquare, 
  Target, 
  Zap, 
  Download, 
  Send,
  ShoppingCart,
  Store,
  Upload,
  FileText,
  DollarSign
} from 'lucide-react';

const DiscoveryEngine = () => {
  const [chatMessages, setChatMessages] = useState<Array<{
    role: 'user' | 'ai';
    content: string;
    timestamp: Date;
    interactive?: any;
  }>>([
    {
      role: 'ai',
      content: "Hello! I'm your AI Factory assistant. I'll help you build your web application from concept to deployment. What kind of application would you like to create today?",
      timestamp: new Date()
    }
  ]);
  
  const [currentInput, setCurrentInput] = useState('');
  const [projectData, setProjectData] = useState<any>({});
  const [conversationStage, setConversationStage] = useState<'discovery' | 'requirements' | 'proposal' | 'prototype' | 'development'>('discovery');

  const conversationFlow = {
    discovery: {
      title: "Project Discovery",
      description: "Understanding your vision and requirements",
      nextStage: "requirements"
    },
    requirements: {
      title: "Requirements Gathering", 
      description: "Defining technical specifications and features",
      nextStage: "proposal"
    },
    proposal: {
      title: "Proposal & Estimation",
      description: "Generating SRS document and cost estimate",
      nextStage: "prototype" 
    },
    prototype: {
      title: "Prototype Generation",
      description: "Creating interactive prototype for approval",
      nextStage: "development"
    },
    development: {
      title: "Development & Deployment",
      description: "Building and launching your application",
      nextStage: "maintenance"
    }
  };

  const handleSendMessage = () => {
    if (!currentInput.trim()) return;

    const userMessage = {
      role: 'user' as const,
      content: currentInput,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);
    
    // Simulate AI response based on conversation stage and input
    setTimeout(() => {
      const aiResponse = generateAIResponse(currentInput, conversationStage);
      setChatMessages(prev => [...prev, aiResponse]);
    }, 1000);

    setCurrentInput('');
  };

  const generateAIResponse = (userInput: string, stage: string) => {
    const responses = {
      discovery: [
        "That sounds like an exciting project! Let me ask you a few questions to better understand your vision. What industry or market will this application serve?",
        "Great! Can you tell me more about your target users? Will they be businesses, consumers, or both?",
        "Interesting! What are the main problems this application will solve for your users?"
      ],
      requirements: [
        "Perfect! Now let's dive into the technical requirements. Will users need to create accounts and log in?",
        "Excellent! Do you need payment processing capabilities? If so, what types of payments?",
        "Got it! What about data storage - will users upload files, create content, or manage profiles?"
      ],
      proposal: [
        "Based on our conversation, I'm generating a comprehensive Software Requirements Specification (SRS) document and cost estimate. This should take just a moment...",
        "I've analyzed your requirements and created a detailed proposal. The estimated cost is $25,000-35,000 with a 6-8 week timeline. Would you like to review the full SRS document?",
        "Excellent! I'll prepare the proposal with wireframes, technical architecture, and a detailed project plan. A 15% deposit will kickstart the development process."
      ]
    };

    const stageResponses = responses[stage] || responses.discovery;
    const randomResponse = stageResponses[Math.floor(Math.random() * stageResponses.length)];

    return {
      role: 'ai' as const,
      content: randomResponse,
      timestamp: new Date(),
      interactive: stage === 'proposal' ? {
        type: 'proposal',
        data: {
          estimatedCost: '$25,000-35,000',
          timeline: '6-8 weeks',
          features: ['User Authentication', 'Payment Processing', 'Admin Dashboard', 'Mobile Responsive'],
          techStack: ['Next.js', 'FastAPI', 'PostgreSQL', 'Stripe']
        }
      } : null
    };
  };

  const handleQuickAction = (action: string) => {
    let message = '';
    switch (action) {
      case 'marketplace':
        message = "I want to build a marketplace for artisans to sell their handmade goods.";
        break;
      case 'saas':
        message = "I need a SaaS platform for project management and team collaboration.";
        break;
      case 'ecommerce':
        message = "I want to create an e-commerce website for my local bakery.";
        break;
      case 'upload':
        message = "I have an existing SRS document I'd like to upload.";
        break;
    }
    setCurrentInput(message);
  };

  const advanceStage = () => {
    const stages = ['discovery', 'requirements', 'proposal', 'prototype', 'development'];
    const currentIndex = stages.indexOf(conversationStage);
    if (currentIndex < stages.length - 1) {
      setConversationStage(stages[currentIndex + 1] as any);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-4">
            AI Factory - Conversational Development
          </h1>
          <p className="text-xl text-muted-foreground">
            Build your application through natural conversation with AI
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Conversation Stage Indicator */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Current Stage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <Badge variant="default" className="mb-2">
                      {conversationFlow[conversationStage].title}
                    </Badge>
                    <p className="text-sm text-muted-foreground">
                      {conversationFlow[conversationStage].description}
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Quick Actions:</h4>
                    <div className="space-y-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full justify-start"
                        onClick={() => handleQuickAction('marketplace')}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Marketplace App
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full justify-start"
                        onClick={() => handleQuickAction('saas')}
                      >
                        <Zap className="h-4 w-4 mr-2" />
                        SaaS Platform
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full justify-start"
                        onClick={() => handleQuickAction('ecommerce')}
                      >
                        <Store className="h-4 w-4 mr-2" />
                        E-commerce Site
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full justify-start"
                        onClick={() => handleQuickAction('upload')}
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Upload SRS
                      </Button>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <h4 className="text-sm font-medium mb-2">Workflow Progress:</h4>
                    <div className="space-y-1">
                      {Object.keys(conversationFlow).map((stage, index) => (
                        <div 
                          key={stage}
                          className={`text-xs p-2 rounded ${
                            stage === conversationStage 
                              ? 'bg-primary text-primary-foreground' 
                              : 'bg-secondary text-secondary-foreground'
                          }`}
                        >
                          {index + 1}. {conversationFlow[stage as keyof typeof conversationFlow].title}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Chat Interface */}
          <div className="lg:col-span-2">
            <Card className="h-[600px] flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  Conversational Dashboard
                </CardTitle>
                <CardDescription>
                  Your AI-powered project assistant
                </CardDescription>
              </CardHeader>
              
              {/* Chat Messages */}
              <CardContent className="flex-1 overflow-y-auto space-y-4 p-4">
                {chatMessages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.role === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary text-secondary-foreground'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      
                      {/* Interactive Elements */}
                      {message.interactive?.type === 'proposal' && (
                        <div className="mt-3 p-3 bg-background/50 rounded border space-y-2">
                          <h4 className="font-medium text-sm">🎯 Project Proposal</h4>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="flex items-center gap-1">
                              <DollarSign className="h-3 w-3" />
                              <span className="text-muted-foreground">Cost:</span> {message.interactive.data.estimatedCost}
                            </div>
                            <div>
                              <span className="text-muted-foreground">Timeline:</span> {message.interactive.data.timeline}
                            </div>
                          </div>
                          <div className="space-y-1">
                            <p className="text-xs font-medium">Features:</p>
                            <div className="flex flex-wrap gap-1">
                              {message.interactive.data.features.map((feature: string, i: number) => (
                                <Badge key={i} variant="outline" className="text-xs">{feature}</Badge>
                              ))}
                            </div>
                          </div>
                          <div className="flex gap-2 mt-2">
                            <Button size="sm" variant="outline">
                              <Download className="h-3 w-3 mr-1" />
                              Download SRS
                            </Button>
                            <Button size="sm" onClick={advanceStage}>
                              <DollarSign className="h-3 w-3 mr-1" />
                              Pay 15% Deposit
                            </Button>
                          </div>
                        </div>
                      )}
                      
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
              
              {/* Input Area */}
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Textarea
                    placeholder="Type your message here..."
                    value={currentInput}
                    onChange={(e) => setCurrentInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    className="min-h-[60px] resize-none"
                  />
                  <Button 
                    onClick={handleSendMessage}
                    disabled={!currentInput.trim()}
                    size="lg"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Phase Description */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>AI Factory Three-Phase Journey</CardTitle>
              <CardDescription>
                Complete development lifecycle managed through conversational AI
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">1</div>
                    <h3 className="font-semibold">Project Initiation</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Conversational requirements discovery → SRS generation → Cost estimation → 15% deposit
                  </p>
                  <div className="text-xs space-y-1">
                    <div>✓ Natural language project description</div>
                    <div>✓ AI-guided clarifying questions</div>
                    <div>✓ Automated SRS document</div>
                    <div>✓ Transparent pricing</div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">2</div>
                    <h3 className="font-semibold">Build & Deploy</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Prototype generation → Feedback integration → Code generation → Testing → Production deployment
                  </p>
                  <div className="text-xs space-y-1">
                    <div>✓ Interactive prototype</div>
                    <div>✓ Conversational feedback</div>
                    <div>✓ Production-ready code</div>
                    <div>✓ Automated testing</div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">3</div>
                    <h3 className="font-semibold">Maintenance</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Continuous monitoring → Autonomous fixes → Performance optimization → Security updates
                  </p>
                  <div className="text-xs space-y-1">
                    <div>✓ Real-time monitoring</div>
                    <div>✓ Proactive issue detection</div>
                    <div>✓ Automated patch application</div>
                    <div>✓ Technical debt prevention</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DiscoveryEngine;