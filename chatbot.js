
const { Configuration, OpenAIApi } = require("openai");

exports.handler = async function(event) {
  try {
    const { message } = JSON.parse(event.body);
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    const prompt = `
You are SafeLine Connect, a supportive, calming AI counselor for U.S. military kids and families stationed overseas...
(User): ${message}
(SafeLine):`;

    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are SafeLine Connect, a supportive counselor for military families." },
        { role: "user", content: message }
      ],
      max_tokens: 300,
    });

    const reply = completion.data.choices[0].message.content;
    return {
      statusCode: 200,
      body: JSON.stringify({ reply }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "An error occurred", detail: err.message }),
    };
  }
};
