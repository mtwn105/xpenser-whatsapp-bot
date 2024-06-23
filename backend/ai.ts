const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);



const generationConfig = {
  temperature: 0.6,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};




const getCategories = async (description: string) => {

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: "detect category subcategory from below for an expense with given description \n1. Housing - Rent, Taxes, Insurance, Utilities, Repairs, Improvement, Fees\n2. Transportation - Payments, Fuel, Insurance, Repairs, Public, Parking, Tolls, Licensing\n3. Food - Groceries, Dining, Coffee, Delivery, Snacks\n4. Utilities - Electricity, Water, Gas, Internet, Cable, Trash, Phone\n5. Health - Insurance, Dental, Vision, Medical, Prescriptions, Medications, Gym, Wellness\n6. Personal - Haircuts, Skincare, Makeup, Hygiene, Clothing\n7. Education - Tuition, Books, Loans, Courses, Activities\n9. Entertainment - Subscriptions, Movies, Concerts, Hobbies, Books\n10. Travel - Flights, Accommodation, Transportation, Insurance, Food, Activities, Souvenirs\n12. Savings - Emergency, Retirement, Accounts, Investments, Education\n13. Miscellaneous - Gifts, Pet, Office, Services, Subscriptions",
  });

  const chatSession = model.startChat({
    generationConfig,
  });

  const result = await chatSession.sendMessage(description);
  const response = JSON.parse(result.response.text());
  return response;
}

const getInsight = async (expenses: string) => {


  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: "my expense history for last 30 days: \n" + expenses,
  });

  const chatSession = model.startChat({
    generationConfig,
  });

  const result = await chatSession.sendMessage("give short and crisp one line insight about my expense history");
  const response = JSON.parse(result.response.text());
  return response;
}

module.exports = {
  getCategories,
  getInsight
}