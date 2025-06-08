
'use client';

import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, AlertCircle, FileSearch, Lightbulb, LineChart, Users, DollarSign, ListChecks, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { contentMarketFitResearch } from '@/ai/flows/content-market-fit-research';
import { useToast } from '@/hooks/use-toast';
import { 
  PREDEFINED_VOICE_TONES_COMMON, 
  ResearchPageFormSchema, 
  type ResearchPageFormValues,
  type ContentMarketFitResearchInput, 
  type ContentMarketFitResearchOutput
} from '@/lib/types';


export default function ContentResearchPage() {
  const [researchResult, setResearchResult] = useState<ContentMarketFitResearchOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<ResearchPageFormValues>({
    resolver: zodResolver(ResearchPageFormSchema),
    defaultValues: {
      topicOrNiche: '',
      targetAudience: '',
      contentIdea: '',
      platformFocus: '',
      desiredOutcome: '',
      selectedPredefinedTone: '',
      customVoiceTone: '',
    },
  });

  const selectedReportTone = form.watch('selectedPredefinedTone');

  const handleFormSubmit = async (data: ResearchPageFormValues) => {
    setIsLoading(true);
    setError(null);
    setResearchResult(null);

    let finalReportVoiceTone: string | undefined;
    if (data.selectedPredefinedTone === 'Custom...') {
      finalReportVoiceTone = data.customVoiceTone?.trim() || undefined;
    } else {
      finalReportVoiceTone = data.selectedPredefinedTone || undefined;
    }

    // Prepare data for the AI flow
    const submissionData: ContentMarketFitResearchInput = {
      topicOrNiche: data.topicOrNiche,
      targetAudience: data.targetAudience,
      contentIdea: data.contentIdea?.trim() || undefined, 
      platformFocus: data.platformFocus?.trim() || undefined,
      desiredOutcome: data.desiredOutcome?.trim() || undefined,
      voiceTone: finalReportVoiceTone,
    };

    try {
      const result = await contentMarketFitResearch(submissionData);
      setResearchResult(result);
      toast({
        title: "Research Complete!",
        description: "Your content market fit analysis is ready.",
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
      setError(`Failed to generate research. ${errorMessage}`);
      toast({
        title: "Error Generating Research",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const renderList = (items: string[] | undefined, placeholder: string = "No specific items provided.") => {
    if (!items || items.length === 0) return <p className="text-sm text-muted-foreground italic">{placeholder}</p>;
    return (
      <ul className="list-disc list-inside space-y-1 pl-2">
        {items.map((item, index) => <li key={index} className="text-sm">{item}</li>)}
      </ul>
    );
  };


  return (
    <PageWrapper title="Content Market Fit Analyzer" description="Get AI-powered insights into your content ideas, niche, and audience.">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-1 shadow-xl bg-card text-card-foreground border-border h-fit lg:sticky lg:top-24">
          <CardHeader>
            <CardTitle className="font-headline text-2xl flex items-center">
              <FileSearch className="mr-2 h-6 w-6 text-accent" />
              Research Parameters
            </CardTitle>
            <CardDescription>
              Provide details about your content to get a comprehensive analysis.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="topicOrNiche"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Topic / Niche</FormLabel>
                      <FormControl>
                        <Input placeholder="E.g., Retro gaming restoration" {...field} />
                      </FormControl>
                      <FormDescription>The main subject of your content.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="targetAudience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Target Audience</FormLabel>
                      <FormControl>
                        <Input placeholder="E.g., Millennials who grew up in the 90s" {...field} />
                      </FormControl>
                      <FormDescription>Who are you trying to reach?</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="contentIdea"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Specific Content Idea (Optional)</FormLabel>
                      <FormControl>
                        <Textarea placeholder="E.g., YouTube series on fixing old consoles" className="min-h-[80px]" {...field} />
                      </FormControl>
                      <FormDescription>A particular show, series, or type of content.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="platformFocus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Platform Focus (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="E.g., YouTube, Instagram Reels" {...field} />
                      </FormControl>
                      <FormDescription>Specific platforms you're targeting.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="desiredOutcome"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Desired Outcome (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="E.g., Grow an engaged community" {...field} />
                      </FormControl>
                      <FormDescription>What do you hope to achieve?</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="selectedPredefinedTone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Report Tone (AI's Voice)</FormLabel>
                       <Select onValueChange={field.onChange} value={field.value || ''}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select AI report tone (default GenZ)" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {PREDEFINED_VOICE_TONES_COMMON.map((tone) => (
                            <SelectItem key={tone} value={tone}>
                              {tone}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>How should the AI present its findings?</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 {selectedReportTone === 'Custom...' && (
                    <FormField
                    control={form.control}
                    name="customVoiceTone"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Custom Report Tone Description</FormLabel>
                        <FormControl>
                            <Input placeholder="E.g., 'Very academic and formal'" {...field} />
                        </FormControl>
                        <FormDescription>Describe the custom tone for the AI's report.</FormDescription>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                )}
                <Button type="submit" disabled={isLoading} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <FileSearch className="mr-2 h-4 w-4" />}
                  Analyze Content Fit
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <div className="lg:col-span-2">
          {isLoading && !researchResult && (
            <Card className="shadow-lg bg-card text-card-foreground border-border">
              <CardContent className="p-10 text-center flex flex-col items-center justify-center min-h-[300px]">
                <Loader2 className="h-16 w-16 animate-spin text-accent mb-4" />
                <p className="text-xl text-foreground font-semibold">Analyzing your content idea...</p>
                <p className="text-muted-foreground">Hang tight, the AI is doing its research magic! ✨</p>
              </CardContent>
            </Card>
          )}

          {error && (
            <Alert variant="destructive" className="shadow-lg">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Analysis Failed</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {researchResult && !isLoading && (
            <Card className="shadow-xl bg-card text-card-foreground border-border">
              <CardHeader>
                <CardTitle className="font-headline text-3xl text-primary-foreground">Content Market Fit Analysis</CardTitle>
                <CardDescription>For: <span className="font-semibold">{form.getValues("topicOrNiche")}</span></CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Accordion type="multiple" defaultValue={['overall-fit', 'market-overview']} className="w-full">
                  
                  <AccordionItem value="overall-fit">
                    <AccordionTrigger className="text-xl font-semibold hover:no-underline">
                        <div className="flex items-center">
                           <CheckCircle2 className="mr-3 h-6 w-6 text-accent" /> Overall Fit & Next Steps
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-2 space-y-3">
                      <Badge variant={
                        researchResult.overallFitScore.score.includes("Strong") || researchResult.overallFitScore.score.includes("Good") ? "default" 
                        : researchResult.overallFitScore.score.includes("Moderate") ? "secondary" 
                        : "destructive"
                        } 
                        className="text-lg px-3 py-1"
                      >
                        {researchResult.overallFitScore.score}
                      </Badge>
                      <p className="text-sm">{researchResult.overallFitScore.summary}</p>
                      <h4 className="font-semibold pt-2">Recommended Next Steps:</h4>
                      {renderList(researchResult.overallFitScore.nextSteps)}
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="market-overview">
                    <AccordionTrigger className="text-xl font-semibold hover:no-underline">
                        <div className="flex items-center">
                           <LineChart className="mr-3 h-6 w-6 text-accent" /> Market Overview
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-2 space-y-3">
                      <p className="text-sm">{researchResult.marketOverview}</p>
                      <h4 className="font-semibold pt-2">Growth Potential: <Badge variant={researchResult.growthPotential.rating === "High" || researchResult.growthPotential.rating === "Emerging" ? "default" : researchResult.growthPotential.rating === "Medium" ? "secondary" : "destructive"}>{researchResult.growthPotential.rating}</Badge></h4>
                      <p className="text-sm">{researchResult.growthPotential.analysis}</p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="audience-analysis">
                    <AccordionTrigger className="text-xl font-semibold hover:no-underline">
                        <div className="flex items-center">
                           <Users className="mr-3 h-6 w-6 text-accent" /> Audience Analysis
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-2 space-y-3">
                      <h4 className="font-semibold">Pain Points:</h4>
                      {renderList(researchResult.audienceAnalysis.painPoints)}
                      <h4 className="font-semibold pt-2">Interests:</h4>
                      {renderList(researchResult.audienceAnalysis.interests)}
                       <h4 className="font-semibold pt-2">Engagement Strategies:</h4>
                      {renderList(researchResult.audienceAnalysis.engagementStrategies)}
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="content-strategy">
                    <AccordionTrigger className="text-xl font-semibold hover:no-underline">
                        <div className="flex items-center">
                           <Lightbulb className="mr-3 h-6 w-6 text-accent" /> Content Strategy
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-2 space-y-3">
                      <h4 className="font-semibold">Recommended Formats:</h4>
                      {renderList(researchResult.contentStrategySuggestions.formats)}
                      <h4 className="font-semibold pt-2">Unique Angles:</h4>
                      {renderList(researchResult.contentStrategySuggestions.angles)}
                      <h4 className="font-semibold pt-2">SEO Keywords:</h4>
                      {renderList(researchResult.contentStrategySuggestions.seoKeywords, "No specific SEO keywords suggested.")}
                      <h4 className="font-semibold pt-2">Content Pillars:</h4>
                      {renderList(researchResult.contentStrategySuggestions.pillars, "No specific content pillars suggested.")}
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="monetization">
                    <AccordionTrigger className="text-xl font-semibold hover:no-underline">
                        <div className="flex items-center">
                           <DollarSign className="mr-3 h-6 w-6 text-accent" /> Monetization Opportunities
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-2 space-y-3">
                      <h4 className="font-semibold">Primary Income Sources:</h4>
                      {renderList(researchResult.monetizationOpportunities.primarySources)}
                      <h4 className="font-semibold pt-2">Secondary Income Sources:</h4>
                      {renderList(researchResult.monetizationOpportunities.secondarySources)}
                      <h4 className="font-semibold pt-2">Income Potential Rationale:</h4>
                      <p className="text-sm italic">{researchResult.monetizationOpportunities.incomeEstimateRationale}</p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  {researchResult.platformSpecificInsights && researchResult.platformSpecificInsights.length > 0 && (
                    <AccordionItem value="platform-insights">
                      <AccordionTrigger className="text-xl font-semibold hover:no-underline">
                          <div className="flex items-center">
                            <ListChecks className="mr-3 h-6 w-6 text-accent" /> Platform-Specific Insights
                          </div>
                      </AccordionTrigger>
                      <AccordionContent className="pt-2 space-y-4">
                        {researchResult.platformSpecificInsights.map((insight, idx) => (
                          <div key={idx} className="p-3 border rounded-md bg-background/50">
                            <h4 className="font-bold text-md text-primary-foreground mb-1">{insight.platform}</h4>
                            <h5 className="font-semibold text-sm mt-2">Growth Tips:</h5>
                            {renderList(insight.growthTips, "No specific growth tips for this platform.")}
                            <h5 className="font-semibold text-sm mt-2">Content Recommendations:</h5>
                            {renderList(insight.contentRecommendations, "No specific content recommendations for this platform.")}
                          </div>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  )}

                  <AccordionItem value="risk-assessment">
                    <AccordionTrigger className="text-xl font-semibold hover:no-underline">
                        <div className="flex items-center">
                           <ShieldAlert className="mr-3 h-6 w-6 text-accent" /> Risk Assessment
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-2 space-y-3">
                      <h4 className="font-semibold">Potential Challenges:</h4>
                      {renderList(researchResult.riskAssessment.potentialChallenges)}
                      <h4 className="font-semibold pt-2">Mitigation Strategies:</h4>
                      {renderList(researchResult.riskAssessment.mitigationStrategies)}
                    </AccordionContent>
                  </AccordionItem>

                </Accordion>
              </CardContent>
               <CardFooter className="mt-4">
                <Button onClick={() => { setResearchResult(null); form.reset(); }} variant="outline" className="w-full sm:w-auto">
                  Start New Research
                </Button>
              </CardFooter>
            </Card>
          )}
           {!researchResult && !isLoading && !error && (
             <Card className="shadow-lg bg-card text-card-foreground border-border">
                <CardContent className="p-10 text-center flex flex-col items-center justify-center min-h-[300px]">
                    <FileSearch className="h-16 w-16 text-muted-foreground mb-4" />
                    <p className="text-xl text-foreground font-semibold">Ready to research your next big idea?</p>
                    <p className="text-muted-foreground">Fill out the form to get started.</p>
                </CardContent>
            </Card>
           )}
        </div>
      </div>
    </PageWrapper>
  );
}
