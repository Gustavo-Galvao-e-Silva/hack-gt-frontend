import axios from "axios";

const agentId = "weatherAgent";

async function testAgent() {
  try {
    const res = await axios.post(`http://localhost:4111/api/agents/${agentId}/generate`, {
      messages: [
        { role: "user", content: "Hello! Can you tell me the weather today?" }
      ]
    });

    console.log("Agent reply:", res.data.text);
  } catch (err) {
    console.error("Error:", err.response?.data || err.message);
  }
}

testAgent();