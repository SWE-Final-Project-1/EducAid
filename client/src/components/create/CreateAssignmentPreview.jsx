export const CreateAssignmentPreview = () => {
  return (
    <div className="h-full px-4 py-2 space-y-2">
      <span className="text-sm opacity-40 font-semibold">
        Students' Preview
      </span>
      <div className="text-[1.8rem] mb-4">Physics Homework 2</div>
      <div className="flex items-start space-x-6">
        <span>
          {" "}
          <span className="font-bold">Due: </span>18 Nov by 23:59
        </span>

        <span>
          {" "}
          <span className="font-bold">Points: </span>20
        </span>

        <span>
          {" "}
          <span className="font-bold">Submitting: </span> PDF, PNG, JPG
        </span>

        <span>
          {" "}
          <span className="font-bold">Available: </span> 14 Nov at 0:00 - 19 Nov
          at 23:59
        </span>
      </div>
      <div className="divider"></div>

      <div
        dangerouslySetInnerHTML={{
          __html: `<div class="description user_content enhanced"><p><strong><span class="textLayer--absolute">Reflection Journal</span></strong></p>
<p><span class="textLayer--absolute">Servant Leadership and NGOs</span></p>
<p>What were your major takeaways from TK Mawuli Azaglo's guest lecture this week? In your opinion, what role do NGOs play in driving social change?</p>
<p>&nbsp;</p>
<p>Managing Failure</p>
<p><span class="textLayer--absolute">How do you respond when things do not go as planned despite your best intentions as a leader? How do you identify, accept, manage, and take responsibility to learn from failure and grow from it? Illustrate your response by giving an example from your personal experience.&nbsp;</span></p></div>`,
        }}
      ></div>
    </div>
  );
};
