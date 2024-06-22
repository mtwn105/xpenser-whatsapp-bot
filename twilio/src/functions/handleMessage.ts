// Imports global types
import '@twilio-labs/serverless-runtime-types';
// Fetches specific types
import {
  Context,
  ServerlessCallback,
  ServerlessFunctionSignature,
} from '@twilio-labs/serverless-runtime-types/types';
import axios from 'axios';

const {
  GoogleGenerativeAI
} = require("@google/generative-ai");

type MyEvent = {
  Body?: string,
  From?: string
}

type MyContext = {
  GREETING?: string,
  GEMINI_API_KEY?: string,
  XPENSER_TOKEN?: string,
  XPENSER_URL?: string,
  XPENSER_UI_URL?: string,
}

export const handler: ServerlessFunctionSignature = async function (
  context: Context<MyContext>,
  event: MyEvent,
  callback: ServerlessCallback
) {

  const from = event.From?.split(":")[1];

  console.log("Message from ", from, " : ", event.Body);

  // Check if user exists
  const xpenserUrl = context.XPENSER_URL;


  let user = null;

  try {

    const response = await axios.get(xpenserUrl + "/api/users/byPhoneNumber/" + from, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + context.XPENSER_TOKEN
      }
    });

    console.log("Response : ", response.data);

    if (response.status != 200) {
      const twiml = new Twilio.twiml.MessagingResponse();
      twiml.message(`You have not yet registered on Xpenser. Please register yourself on ${xpenserUrl} to start using Xpenser and managing & analyzing your spends.`);
      callback(null, twiml);
      return
    }

    user = response.data;

  } catch (error) {
    console.log("Error : ", error);
    const twiml = new Twilio.twiml.MessagingResponse();
    twiml.message(`You have not yet registered on Xpenser. Please register yourself on ${context.XPENSER_UI_URL} to start using Xpenser and managing & analyzing your spends.`);
    callback(null, twiml);
    return
  }

  const apiKey = context.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: `Detect intent in one word out of these:\n\nspend, analytics, other\n\nspend - related to logging a new expense/spend and nothing else. \nanalytics - related to the analysis of past spends/expenses\nother - any other apart from two\n\nIf it is a spend, \n\nthen it should contain the following stuff - what was the expense (i.e. description), amount, date, then you will detect the category and subcategory from below\n1. Housing - Rent, Taxes, Insurance, Utilities, Repairs, Improvement, Fees\n2. Transportation - Payments, Fuel, Insurance, Repairs, Public, Parking, Tolls, Licensing\n3. Food - Groceries, Dining, Coffee, Delivery, Snacks\n4. Utilities - Electricity, Water, Gas, Internet, Cable, Trash, Phone\n5. Health - Insurance, Dental, Vision, Medical, Prescriptions, Medications, Gym, Wellness\n6. Personal - Haircuts, Skincare, Makeup, Hygiene, Clothing\n7. Education - Tuition, Books, Loans, Courses, Activities\n9. Entertainment - Subscriptions, Movies, Concerts, Hobbies, Books\n10. Travel - Flights, Accommodation, Transportation, Insurance, Food, Activities, Souvenirs\n12. Savings - Emergency, Retirement, Accounts, Investments, Education\n13. Miscellaneous - Gifts, Pet, Office, Services, Subscriptions\n\nthe date is in YYYY-MM-DD format. default value - today - ${new Date().getFullYear()}-${new Date().getUTCMonth() + 1}-${new Date().getDate()}\n\ngive output as \n\n{\n  \"description\": \"description of the expense\",\n  \"amount\": 100,\n  \"category\": \"main category of the expense\",\n  \"subCategory\": \"subcategory of the expense\",\n  \"date\": \"date of the purchase in format ISO\"\n}`,
  });

  const generationConfig = {
    temperature: 0.6,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };

  const chatSession = model.startChat({
    generationConfig
  });

  try {

    const result = await chatSession.sendMessage(event.Body);
    const aiResponse = result.response.text()
    console.log("Response Json : ", aiResponse);

    const twiml = new Twilio.twiml.MessagingResponse();

    try {
      const aiResponseJson: any = JSON.parse(aiResponse);

      if (aiResponseJson?.intent == 'other' || aiResponseJson?.intent == 'analytics') {
        twiml.message("Please ask about spends you have done or spend you want to log.");
        callback(null, twiml);
        return;
      }

      if (!aiResponseJson.description || aiResponseJson.description == "" || !aiResponseJson.amount || aiResponseJson.amount == 0 || !aiResponseJson.date || aiResponseJson.date == "" || !aiResponseJson.category || aiResponseJson.category == "" || !aiResponseJson.subCategory || aiResponseJson.subCategory == "") {
        twiml.message("To log your expense please provide the description and the amount");
        callback(null, twiml);
        return;
      }

      // Create expense
      const expense = {
        user: user._id,
        description: aiResponseJson.description,
        amount: aiResponseJson.amount,
        date: aiResponseJson.date,
        category: aiResponseJson.category,
        subCategory: aiResponseJson.subCategory,
      }

      try {

        const expenseResponse = await axios.post(xpenserUrl + "/api/expenses", expense, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + context.XPENSER_TOKEN
          }
        });

        const twiml = new Twilio.twiml.MessagingResponse();

        const message = `Your expense is logged successfully as below:
*📝 Description:* ${expenseResponse.data.description}
*✨ Category:* ${expenseResponse.data.category}
*🎫 Sub Category:* ${expenseResponse.data.subCategory}
*💲 Amount:* ${user.currency} ${expenseResponse.data.amount}
*📅 Date:* ${aiResponseJson.date}

You can also view/manage it on ${context.XPENSER_UI_URL}/expense/${expenseResponse.data._id}`;

        console.log("Sending message to ", from, "  : ", message);

        twiml.message(message);
        callback(null, twiml);
        return;


      } catch (err) {
        console.log("Error : ", err);
        const twiml = new Twilio.twiml.MessagingResponse();
        twiml.message("Something went wrong. Please try again.");
        callback(null, twiml);
      }

    } catch (err) {
      console.log("Error : ", err);
      const twiml = new Twilio.twiml.MessagingResponse();
      twiml.message("Please ask about spends you have done or spend you want to log.");
      callback(null, twiml);
      return;
    }

    // const twiml = new Twilio.twiml.MessagingResponse();


    // switch (intent) {

    //   case "spend":

    //     callback(null, twiml);
    //     return;

    //   case "analytics":
    //     twiml.message("analytics");
    //     callback(null, twiml);

    //   case "other":
    //     twiml.message("Please ask about spends you have done or spend you want to log.");
    //     callback(null, twiml);

    //   default:
    //     twiml.message("Please ask about spends you have done or spend you want to log.");
    //     callback(null, twiml);

    // }


    // const twiml = new Twilio.twiml.MessagingResponse();
    // twiml.message(result.response.text());
    // callback(null, twiml);
  } catch (err) {
    console.log("Error : ", err);
    const twiml = new Twilio.twiml.MessagingResponse();
    twiml.message("Something went wrong. Please try again.");
    callback(null, twiml);
  }
};