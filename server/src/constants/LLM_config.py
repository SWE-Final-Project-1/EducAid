# Prompt Parameters
AI_ROLE = """You are GradeAI, a replacement for teachers in a High School, located in North America.
You are a trained expert on writing and literary analysis. Your job is to accurately and effectively grade a student's essay and give them helpful feedback according to the assignment prompt."""

SYSTEM_INSTRUCTIONS = """Assess the student's assignment based on the provided rubric.
Respond back with graded points and a level for each criteria. Don't rewrite the rubric in order to save processing power. In the end, write short feedback about what steps they might take to improve on their assignment. Write a total percentage grade and letter grade. In your overall response, try to be lenient and keep in mind that the student is still learning. While grading the essay remember the writing level the student is at while considering their course level, grade level, and the overall expectations of writing should be producing.
Your grade should only be below 70% if the essay does not succeed at all in any of the criteria. Your grade should only be below 80% if the essay is not sufficient in most of the criteria. Your grade should only be below 90% if there are a few criteria where the essay doesn't excell. Your grade should only be above 90% if the essay succeeds in most of the criteria.
Understand that the essay was written by a human and think about their writing expectations for their grade level/course level, be lenient and give the student the benefit of the doubt.

Give me your entire response in JSON format for easy processing.
Response Format:
[{"Criteria": "...", "Level": "4", "Feedback": "Student must..."}, {"Grade": "B", "Percentage": "85%"}, {"Feedback": "Some suggestions to improve..."}] where you create a Criteria object for each individual criteria, and Grade represents the overall assignment grade. Write out a list of bullet points regarding the specific suggestions in their essay with references to examples in the essay. as a "Feedback" key.
Response should be formatted strictly as json based on the criteria above. DON'T RETURN RAW TEXT 
"""


# Sample Assignment Information
COURSE_INFORMATION = """Course: English 10"""

RUBRIC = """
 <table>
        <tr>
            <th>Criteria</th>
            <th>Excellent (9-10)</th>
            <th>Good (7-8)</th>
            <th>Satisfactory (5-6)</th>
            <th>Needs Improvement (0-4)</th>
        </tr>
        <tr>
            <td>Introduction</td>
            <td>Captivating introduction that effectively sets the tone for the essay.</td>
            <td>Good introduction, but could be more engaging or focused.</td>
            <td>Satisfactory introduction that adequately introduces the topic.</td>
            <td>Weaker introduction lacking clarity or engagement.</td>
        </tr>
        <tr>
            <td>Situation Description</td>
            <td>Detailed and vivid description of the situation, providing a clear understanding of the context.</td>
            <td>Good description of the situation, but some aspects may be lacking in detail.</td>
            <td>Adequate description of the situation, but may lack depth or clarity in some areas.</td>
            <td>Weaker description with insufficient detail or clarity.</td>
        </tr>
        <tr>
            <td>Decision-Making Process</td>
            <td>Thorough exploration of the decision-making process, including self-reflection, research, and consultations.</td>
            <td>Good analysis of the decision-making process, but some aspects may be briefly addressed.</td>
            <td>Adequate exploration of the decision-making process, but may lack depth in some areas.</td>
            <td>Weaker analysis with insufficient detail or clarity in the decision-making process.</td>
        </tr>
        <tr>
            <td>Outcome Analysis</td>
            <td>Comprehensive analysis of the outcome, including personal and professional growth.</td>
            <td>Good analysis of the outcome, but some aspects may be briefly addressed.</td>
            <td>Adequate analysis of the outcome, but may lack depth in some areas.</td>
            <td>Weaker analysis with insufficient detail or clarity in the outcome.</td>
        </tr>
        <tr>
            <td>Conclusion</td>
            <td>Strong conclusion summarizing key points and reflecting on the significance of the decision.</td>
            <td>Good conclusion, but may lack emphasis on the broader significance of the decision.</td>
            <td>Satisfactory conclusion that restates key points without significant insight.</td>
            <td>Weaker conclusion lacking clear summarization or insight into the significance of the decision.</td>
        </tr>
        <tr>
            <td>Writing Style</td>
            <td>Well-organized, clear, and concise writing with a strong narrative and academic tone.</td>
            <td>Good organization and clarity, but occasional lapses in style or conciseness.</td>
            <td>Satisfactory writing style, with some issues affecting organization, clarity, or conciseness.</td>
            <td>Weaker writing style, with frequent issues affecting organization, clarity, and conciseness.</td>
        </tr>
        <tr>
            <td>Grammar and Mechanics</td>
            <td>Almost flawless grammar, punctuation, and spelling throughout the essay.</td>
            <td>Good grammar and mechanics with only minor errors that do not significantly impact readability.</td>
            <td>Some noticeable errors in grammar, punctuation, or spelling, but they do not severely impact comprehension.</td>
            <td>Frequent and distracting errors in grammar, punctuation, or spelling that hinder comprehension.</td>
        </tr>
    </table>
"""

ASSIGNMENT_INSTRUCTIONS = """Write an essay about a time you had to make a difficult decision. Describe the situation, what you did, and what the outcome was."""

ESSAY = """
Title: The Bland Chronicles of Ice Cream Confusion

Introduction:

One day, I had to make a sort-of-hard decision, I guess. It was about picking ice cream, which sounds important, but it wasn't. This essay is about that, and it's probably not going to be great, just like the decision.

The Situation:

So, there I was, standing in the store, staring at the freezer like it held the secrets of the universe. The choice was between vanilla and French vanilla. I mean, seriously, what's the big deal? They both looked kinda the same, and I wasn't in the mood for a life-changing experience in the ice cream aisle.

The Dilemma:

The dilemma wasn't really a dilemma. It was more like a mild inconvenience. I mean, who cares about the subtle nuances of vanilla versus French vanilla? Not me. But I had to decide because, you know, ice cream is important or whatever.

What I Did:

Eventually, after what felt like an eternity but was probably only a few minutes, I randomly grabbed a tub of vanilla. Why? I have no idea. It seemed like the quickest way to get out of there and back to doing something marginally more interesting.

The Outcome:

So, I got home with my vanilla ice cream, and guess what? It tasted like vanilla. I know, shocker. The whole experience was as forgettable as the ice cream itself. No epiphanies, no life-altering revelations, just a melting tub of frozen mediocrity.

Conclusion:

In conclusion, the ice cream decision wasn't a decision at all. It was more like a moment of fleeting indifference in the grand scheme of my thrilling life. Vanilla or French vanilla, who cares? The lackluster nature of this so-called "difficult decision" is a testament to the mundane choices we sometimes have to make, or not make, because, let's face it, not everything in life is as exciting as it should be.
"""
