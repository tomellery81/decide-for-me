// =============================================
// DECIDE FOR ME — STARTER MISSION DATABASE
// 1,200 MISSIONS | 200 PER CATEGORY
// =============================================

const STARTER_CHALLENGES = [
  {
    "id": "c0001",
    "category": "relationships",
    "difficulty": "easy",
    "text": "Send a thinking-of-you message"
  },
  {
    "id": "c0002",
    "category": "relationships",
    "difficulty": "easy",
    "text": "Give someone a genuine compliment"
  },
  {
    "id": "c0003",
    "category": "relationships",
    "difficulty": "easy",
    "text": "Thank someone for something specific"
  },
  {
    "id": "c0004",
    "category": "relationships",
    "difficulty": "easy",
    "text": "Ask a friend how they really are"
  },
  {
    "id": "c0005",
    "category": "relationships",
    "difficulty": "easy",
    "text": "Tell someone you appreciate them"
  },
  {
    "id": "c0006",
    "category": "relationships",
    "difficulty": "easy",
    "text": "Share a happy memory with someone"
  },
  {
    "id": "c0007",
    "category": "relationships",
    "difficulty": "easy",
    "text": "Check in with someone you have not spoken to recently"
  },
  {
    "id": "c0008",
    "category": "relationships",
    "difficulty": "easy",
    "text": "Send encouragement to someone facing a difficult week"
  },
  {
    "id": "c0009",
    "category": "relationships",
    "difficulty": "easy",
    "text": "Send a thinking-of-you message. Do it now."
  },
  {
    "id": "c0010",
    "category": "relationships",
    "difficulty": "easy",
    "text": "Give someone a genuine compliment. Do it now."
  },
  {
    "id": "c0011",
    "category": "relationships",
    "difficulty": "easy",
    "text": "Thank someone for something specific. Do it now."
  },
  {
    "id": "c0012",
    "category": "relationships",
    "difficulty": "easy",
    "text": "Ask a friend how they really are. Do it now."
  },
  {
    "id": "c0013",
    "category": "relationships",
    "difficulty": "easy",
    "text": "Tell someone you appreciate them. Do it now."
  },
  {
    "id": "c0014",
    "category": "relationships",
    "difficulty": "easy",
    "text": "Share a happy memory with someone. Do it now."
  },
  {
    "id": "c0015",
    "category": "relationships",
    "difficulty": "easy",
    "text": "Check in with someone you have not spoken to recently. Do it now."
  },
  {
    "id": "c0016",
    "category": "relationships",
    "difficulty": "easy",
    "text": "Send encouragement to someone facing a difficult week. Do it now."
  },
  {
    "id": "c0017",
    "category": "relationships",
    "difficulty": "easy",
    "text": "Send a thinking-of-you message. Do it before the end of today."
  },
  {
    "id": "c0018",
    "category": "relationships",
    "difficulty": "easy",
    "text": "Give someone a genuine compliment. Do it before the end of today."
  },
  {
    "id": "c0019",
    "category": "relationships",
    "difficulty": "easy",
    "text": "Thank someone for something specific. Do it before the end of today."
  },
  {
    "id": "c0020",
    "category": "relationships",
    "difficulty": "easy",
    "text": "Ask a friend how they really are. Do it before the end of today."
  },
  {
    "id": "c0021",
    "category": "relationships",
    "difficulty": "easy",
    "text": "Tell someone you appreciate them. Do it before the end of today."
  },
  {
    "id": "c0022",
    "category": "relationships",
    "difficulty": "easy",
    "text": "Share a happy memory with someone. Do it before the end of today."
  },
  {
    "id": "c0023",
    "category": "relationships",
    "difficulty": "easy",
    "text": "Check in with someone you have not spoken to recently. Do it before the end of today."
  },
  {
    "id": "c0024",
    "category": "relationships",
    "difficulty": "easy",
    "text": "Send encouragement to someone facing a difficult week. Do it before the end of today."
  },
  {
    "id": "c0025",
    "category": "relationships",
    "difficulty": "easy",
    "text": "Send a thinking-of-you message. Do it without overthinking."
  },
  {
    "id": "c0026",
    "category": "relationships",
    "difficulty": "easy",
    "text": "Give someone a genuine compliment. Do it without overthinking."
  },
  {
    "id": "c0027",
    "category": "relationships",
    "difficulty": "easy",
    "text": "Thank someone for something specific. Do it without overthinking."
  },
  {
    "id": "c0028",
    "category": "relationships",
    "difficulty": "easy",
    "text": "Ask a friend how they really are. Do it without overthinking."
  },
  {
    "id": "c0029",
    "category": "relationships",
    "difficulty": "easy",
    "text": "Tell someone you appreciate them. Do it without overthinking."
  },
  {
    "id": "c0030",
    "category": "relationships",
    "difficulty": "easy",
    "text": "Share a happy memory with someone. Do it without overthinking."
  },
  {
    "id": "c0031",
    "category": "relationships",
    "difficulty": "easy",
    "text": "Check in with someone you have not spoken to recently. Do it without overthinking."
  },
  {
    "id": "c0032",
    "category": "relationships",
    "difficulty": "easy",
    "text": "Send encouragement to someone facing a difficult week. Do it without overthinking."
  },
  {
    "id": "c0033",
    "category": "relationships",
    "difficulty": "easy",
    "text": "Send a thinking-of-you message. Do it and record that you did it."
  },
  {
    "id": "c0034",
    "category": "relationships",
    "difficulty": "easy",
    "text": "Give someone a genuine compliment. Do it and record that you did it."
  },
  {
    "id": "c0035",
    "category": "relationships",
    "difficulty": "easy",
    "text": "Thank someone for something specific. Do it and record that you did it."
  },
  {
    "id": "c0036",
    "category": "relationships",
    "difficulty": "easy",
    "text": "Ask a friend how they really are. Do it and record that you did it."
  },
  {
    "id": "c0037",
    "category": "relationships",
    "difficulty": "easy",
    "text": "Tell someone you appreciate them. Do it and record that you did it."
  },
  {
    "id": "c0038",
    "category": "relationships",
    "difficulty": "easy",
    "text": "Share a happy memory with someone. Do it and record that you did it."
  },
  {
    "id": "c0039",
    "category": "relationships",
    "difficulty": "easy",
    "text": "Check in with someone you have not spoken to recently. Do it and record that you did it."
  },
  {
    "id": "c0040",
    "category": "relationships",
    "difficulty": "easy",
    "text": "Send encouragement to someone facing a difficult week. Do it and record that you did it."
  },
  {
    "id": "c0041",
    "category": "relationships",
    "difficulty": "normal",
    "text": "Arrange a catch-up with someone"
  },
  {
    "id": "c0042",
    "category": "relationships",
    "difficulty": "normal",
    "text": "Call a family member"
  },
  {
    "id": "c0043",
    "category": "relationships",
    "difficulty": "normal",
    "text": "Write a thoughtful message to an old friend"
  },
  {
    "id": "c0044",
    "category": "relationships",
    "difficulty": "normal",
    "text": "Ask someone to join you for coffee"
  },
  {
    "id": "c0045",
    "category": "relationships",
    "difficulty": "normal",
    "text": "Apologise for a small thing you have avoided"
  },
  {
    "id": "c0046",
    "category": "relationships",
    "difficulty": "normal",
    "text": "Tell someone an honest positive thing you usually keep to yourself"
  },
  {
    "id": "c0047",
    "category": "relationships",
    "difficulty": "normal",
    "text": "Make time for an uninterrupted conversation"
  },
  {
    "id": "c0048",
    "category": "relationships",
    "difficulty": "normal",
    "text": "Offer practical help to someone"
  },
  {
    "id": "c0049",
    "category": "relationships",
    "difficulty": "normal",
    "text": "Arrange a catch-up with someone. Do it now."
  },
  {
    "id": "c0050",
    "category": "relationships",
    "difficulty": "normal",
    "text": "Call a family member. Do it now."
  },
  {
    "id": "c0051",
    "category": "relationships",
    "difficulty": "normal",
    "text": "Write a thoughtful message to an old friend. Do it now."
  },
  {
    "id": "c0052",
    "category": "relationships",
    "difficulty": "normal",
    "text": "Ask someone to join you for coffee. Do it now."
  },
  {
    "id": "c0053",
    "category": "relationships",
    "difficulty": "normal",
    "text": "Apologise for a small thing you have avoided. Do it now."
  },
  {
    "id": "c0054",
    "category": "relationships",
    "difficulty": "normal",
    "text": "Tell someone an honest positive thing you usually keep to yourself. Do it now."
  },
  {
    "id": "c0055",
    "category": "relationships",
    "difficulty": "normal",
    "text": "Make time for an uninterrupted conversation. Do it now."
  },
  {
    "id": "c0056",
    "category": "relationships",
    "difficulty": "normal",
    "text": "Offer practical help to someone. Do it now."
  },
  {
    "id": "c0057",
    "category": "relationships",
    "difficulty": "normal",
    "text": "Arrange a catch-up with someone. Do it before the end of today."
  },
  {
    "id": "c0058",
    "category": "relationships",
    "difficulty": "normal",
    "text": "Call a family member. Do it before the end of today."
  },
  {
    "id": "c0059",
    "category": "relationships",
    "difficulty": "normal",
    "text": "Write a thoughtful message to an old friend. Do it before the end of today."
  },
  {
    "id": "c0060",
    "category": "relationships",
    "difficulty": "normal",
    "text": "Ask someone to join you for coffee. Do it before the end of today."
  },
  {
    "id": "c0061",
    "category": "relationships",
    "difficulty": "normal",
    "text": "Apologise for a small thing you have avoided. Do it before the end of today."
  },
  {
    "id": "c0062",
    "category": "relationships",
    "difficulty": "normal",
    "text": "Tell someone an honest positive thing you usually keep to yourself. Do it before the end of today."
  },
  {
    "id": "c0063",
    "category": "relationships",
    "difficulty": "normal",
    "text": "Make time for an uninterrupted conversation. Do it before the end of today."
  },
  {
    "id": "c0064",
    "category": "relationships",
    "difficulty": "normal",
    "text": "Offer practical help to someone. Do it before the end of today."
  },
  {
    "id": "c0065",
    "category": "relationships",
    "difficulty": "normal",
    "text": "Arrange a catch-up with someone. Do it without overthinking."
  },
  {
    "id": "c0066",
    "category": "relationships",
    "difficulty": "normal",
    "text": "Call a family member. Do it without overthinking."
  },
  {
    "id": "c0067",
    "category": "relationships",
    "difficulty": "normal",
    "text": "Write a thoughtful message to an old friend. Do it without overthinking."
  },
  {
    "id": "c0068",
    "category": "relationships",
    "difficulty": "normal",
    "text": "Ask someone to join you for coffee. Do it without overthinking."
  },
  {
    "id": "c0069",
    "category": "relationships",
    "difficulty": "normal",
    "text": "Apologise for a small thing you have avoided. Do it without overthinking."
  },
  {
    "id": "c0070",
    "category": "relationships",
    "difficulty": "normal",
    "text": "Tell someone an honest positive thing you usually keep to yourself. Do it without overthinking."
  },
  {
    "id": "c0071",
    "category": "relationships",
    "difficulty": "normal",
    "text": "Make time for an uninterrupted conversation. Do it without overthinking."
  },
  {
    "id": "c0072",
    "category": "relationships",
    "difficulty": "normal",
    "text": "Offer practical help to someone. Do it without overthinking."
  },
  {
    "id": "c0073",
    "category": "relationships",
    "difficulty": "normal",
    "text": "Arrange a catch-up with someone. Do it and record that you did it."
  },
  {
    "id": "c0074",
    "category": "relationships",
    "difficulty": "normal",
    "text": "Call a family member. Do it and record that you did it."
  },
  {
    "id": "c0075",
    "category": "relationships",
    "difficulty": "normal",
    "text": "Write a thoughtful message to an old friend. Do it and record that you did it."
  },
  {
    "id": "c0076",
    "category": "relationships",
    "difficulty": "normal",
    "text": "Ask someone to join you for coffee. Do it and record that you did it."
  },
  {
    "id": "c0077",
    "category": "relationships",
    "difficulty": "normal",
    "text": "Apologise for a small thing you have avoided. Do it and record that you did it."
  },
  {
    "id": "c0078",
    "category": "relationships",
    "difficulty": "normal",
    "text": "Tell someone an honest positive thing you usually keep to yourself. Do it and record that you did it."
  },
  {
    "id": "c0079",
    "category": "relationships",
    "difficulty": "normal",
    "text": "Make time for an uninterrupted conversation. Do it and record that you did it."
  },
  {
    "id": "c0080",
    "category": "relationships",
    "difficulty": "normal",
    "text": "Offer practical help to someone. Do it and record that you did it."
  },
  {
    "id": "c0081",
    "category": "relationships",
    "difficulty": "challenge",
    "text": "Reconnect with someone you have lost touch with"
  },
  {
    "id": "c0082",
    "category": "relationships",
    "difficulty": "challenge",
    "text": "Have a conversation you have been avoiding"
  },
  {
    "id": "c0083",
    "category": "relationships",
    "difficulty": "challenge",
    "text": "Ask for honest feedback from someone you trust"
  },
  {
    "id": "c0084",
    "category": "relationships",
    "difficulty": "challenge",
    "text": "Set a healthy boundary in a relationship"
  },
  {
    "id": "c0085",
    "category": "relationships",
    "difficulty": "challenge",
    "text": "Admit when you were wrong"
  },
  {
    "id": "c0086",
    "category": "relationships",
    "difficulty": "challenge",
    "text": "Tell someone how their actions made you feel"
  },
  {
    "id": "c0087",
    "category": "relationships",
    "difficulty": "challenge",
    "text": "Reach out first after a disagreement"
  },
  {
    "id": "c0088",
    "category": "relationships",
    "difficulty": "challenge",
    "text": "Have a vulnerable conversation without hiding behind humour"
  },
  {
    "id": "c0089",
    "category": "relationships",
    "difficulty": "challenge",
    "text": "Reconnect with someone you have lost touch with. Do it now."
  },
  {
    "id": "c0090",
    "category": "relationships",
    "difficulty": "challenge",
    "text": "Have a conversation you have been avoiding. Do it now."
  },
  {
    "id": "c0091",
    "category": "relationships",
    "difficulty": "challenge",
    "text": "Ask for honest feedback from someone you trust. Do it now."
  },
  {
    "id": "c0092",
    "category": "relationships",
    "difficulty": "challenge",
    "text": "Set a healthy boundary in a relationship. Do it now."
  },
  {
    "id": "c0093",
    "category": "relationships",
    "difficulty": "challenge",
    "text": "Admit when you were wrong. Do it now."
  },
  {
    "id": "c0094",
    "category": "relationships",
    "difficulty": "challenge",
    "text": "Tell someone how their actions made you feel. Do it now."
  },
  {
    "id": "c0095",
    "category": "relationships",
    "difficulty": "challenge",
    "text": "Reach out first after a disagreement. Do it now."
  },
  {
    "id": "c0096",
    "category": "relationships",
    "difficulty": "challenge",
    "text": "Have a vulnerable conversation without hiding behind humour. Do it now."
  },
  {
    "id": "c0097",
    "category": "relationships",
    "difficulty": "challenge",
    "text": "Reconnect with someone you have lost touch with. Do it before the end of today."
  },
  {
    "id": "c0098",
    "category": "relationships",
    "difficulty": "challenge",
    "text": "Have a conversation you have been avoiding. Do it before the end of today."
  },
  {
    "id": "c0099",
    "category": "relationships",
    "difficulty": "challenge",
    "text": "Ask for honest feedback from someone you trust. Do it before the end of today."
  },
  {
    "id": "c0100",
    "category": "relationships",
    "difficulty": "challenge",
    "text": "Set a healthy boundary in a relationship. Do it before the end of today."
  },
  {
    "id": "c0101",
    "category": "relationships",
    "difficulty": "challenge",
    "text": "Admit when you were wrong. Do it before the end of today."
  },
  {
    "id": "c0102",
    "category": "relationships",
    "difficulty": "challenge",
    "text": "Tell someone how their actions made you feel. Do it before the end of today."
  },
  {
    "id": "c0103",
    "category": "relationships",
    "difficulty": "challenge",
    "text": "Reach out first after a disagreement. Do it before the end of today."
  },
  {
    "id": "c0104",
    "category": "relationships",
    "difficulty": "challenge",
    "text": "Have a vulnerable conversation without hiding behind humour. Do it before the end of today."
  },
  {
    "id": "c0105",
    "category": "relationships",
    "difficulty": "challenge",
    "text": "Reconnect with someone you have lost touch with. Do it without overthinking."
  },
  {
    "id": "c0106",
    "category": "relationships",
    "difficulty": "challenge",
    "text": "Have a conversation you have been avoiding. Do it without overthinking."
  },
  {
    "id": "c0107",
    "category": "relationships",
    "difficulty": "challenge",
    "text": "Ask for honest feedback from someone you trust. Do it without overthinking."
  },
  {
    "id": "c0108",
    "category": "relationships",
    "difficulty": "challenge",
    "text": "Set a healthy boundary in a relationship. Do it without overthinking."
  },
  {
    "id": "c0109",
    "category": "relationships",
    "difficulty": "challenge",
    "text": "Admit when you were wrong. Do it without overthinking."
  },
  {
    "id": "c0110",
    "category": "relationships",
    "difficulty": "challenge",
    "text": "Tell someone how their actions made you feel. Do it without overthinking."
  },
  {
    "id": "c0111",
    "category": "relationships",
    "difficulty": "challenge",
    "text": "Reach out first after a disagreement. Do it without overthinking."
  },
  {
    "id": "c0112",
    "category": "relationships",
    "difficulty": "challenge",
    "text": "Have a vulnerable conversation without hiding behind humour. Do it without overthinking."
  },
  {
    "id": "c0113",
    "category": "relationships",
    "difficulty": "challenge",
    "text": "Reconnect with someone you have lost touch with. Do it and record that you did it."
  },
  {
    "id": "c0114",
    "category": "relationships",
    "difficulty": "challenge",
    "text": "Have a conversation you have been avoiding. Do it and record that you did it."
  },
  {
    "id": "c0115",
    "category": "relationships",
    "difficulty": "challenge",
    "text": "Ask for honest feedback from someone you trust. Do it and record that you did it."
  },
  {
    "id": "c0116",
    "category": "relationships",
    "difficulty": "challenge",
    "text": "Set a healthy boundary in a relationship. Do it and record that you did it."
  },
  {
    "id": "c0117",
    "category": "relationships",
    "difficulty": "challenge",
    "text": "Admit when you were wrong. Do it and record that you did it."
  },
  {
    "id": "c0118",
    "category": "relationships",
    "difficulty": "challenge",
    "text": "Tell someone how their actions made you feel. Do it and record that you did it."
  },
  {
    "id": "c0119",
    "category": "relationships",
    "difficulty": "challenge",
    "text": "Reach out first after a disagreement. Do it and record that you did it."
  },
  {
    "id": "c0120",
    "category": "relationships",
    "difficulty": "challenge",
    "text": "Have a vulnerable conversation without hiding behind humour. Do it and record that you did it."
  },
  {
    "id": "c0121",
    "category": "relationships",
    "difficulty": "brutal",
    "text": "Address a long-running unresolved issue"
  },
  {
    "id": "c0122",
    "category": "relationships",
    "difficulty": "brutal",
    "text": "Have the difficult conversation you have postponed"
  },
  {
    "id": "c0123",
    "category": "relationships",
    "difficulty": "brutal",
    "text": "Apologise sincerely without defending yourself"
  },
  {
    "id": "c0124",
    "category": "relationships",
    "difficulty": "brutal",
    "text": "Ask someone whether there is unresolved tension between you"
  },
  {
    "id": "c0125",
    "category": "relationships",
    "difficulty": "brutal",
    "text": "Set a boundary you have repeatedly failed to maintain"
  },
  {
    "id": "c0126",
    "category": "relationships",
    "difficulty": "brutal",
    "text": "Tell someone an important truth you are afraid to say"
  },
  {
    "id": "c0127",
    "category": "relationships",
    "difficulty": "brutal",
    "text": "Repair a relationship through direct action"
  },
  {
    "id": "c0128",
    "category": "relationships",
    "difficulty": "brutal",
    "text": "Let go of a grudge and communicate your intention"
  },
  {
    "id": "c0129",
    "category": "relationships",
    "difficulty": "brutal",
    "text": "Address a long-running unresolved issue. Do it now."
  },
  {
    "id": "c0130",
    "category": "relationships",
    "difficulty": "brutal",
    "text": "Have the difficult conversation you have postponed. Do it now."
  },
  {
    "id": "c0131",
    "category": "relationships",
    "difficulty": "brutal",
    "text": "Apologise sincerely without defending yourself. Do it now."
  },
  {
    "id": "c0132",
    "category": "relationships",
    "difficulty": "brutal",
    "text": "Ask someone whether there is unresolved tension between you. Do it now."
  },
  {
    "id": "c0133",
    "category": "relationships",
    "difficulty": "brutal",
    "text": "Set a boundary you have repeatedly failed to maintain. Do it now."
  },
  {
    "id": "c0134",
    "category": "relationships",
    "difficulty": "brutal",
    "text": "Tell someone an important truth you are afraid to say. Do it now."
  },
  {
    "id": "c0135",
    "category": "relationships",
    "difficulty": "brutal",
    "text": "Repair a relationship through direct action. Do it now."
  },
  {
    "id": "c0136",
    "category": "relationships",
    "difficulty": "brutal",
    "text": "Let go of a grudge and communicate your intention. Do it now."
  },
  {
    "id": "c0137",
    "category": "relationships",
    "difficulty": "brutal",
    "text": "Address a long-running unresolved issue. Do it before the end of today."
  },
  {
    "id": "c0138",
    "category": "relationships",
    "difficulty": "brutal",
    "text": "Have the difficult conversation you have postponed. Do it before the end of today."
  },
  {
    "id": "c0139",
    "category": "relationships",
    "difficulty": "brutal",
    "text": "Apologise sincerely without defending yourself. Do it before the end of today."
  },
  {
    "id": "c0140",
    "category": "relationships",
    "difficulty": "brutal",
    "text": "Ask someone whether there is unresolved tension between you. Do it before the end of today."
  },
  {
    "id": "c0141",
    "category": "relationships",
    "difficulty": "brutal",
    "text": "Set a boundary you have repeatedly failed to maintain. Do it before the end of today."
  },
  {
    "id": "c0142",
    "category": "relationships",
    "difficulty": "brutal",
    "text": "Tell someone an important truth you are afraid to say. Do it before the end of today."
  },
  {
    "id": "c0143",
    "category": "relationships",
    "difficulty": "brutal",
    "text": "Repair a relationship through direct action. Do it before the end of today."
  },
  {
    "id": "c0144",
    "category": "relationships",
    "difficulty": "brutal",
    "text": "Let go of a grudge and communicate your intention. Do it before the end of today."
  },
  {
    "id": "c0145",
    "category": "relationships",
    "difficulty": "brutal",
    "text": "Address a long-running unresolved issue. Do it without overthinking."
  },
  {
    "id": "c0146",
    "category": "relationships",
    "difficulty": "brutal",
    "text": "Have the difficult conversation you have postponed. Do it without overthinking."
  },
  {
    "id": "c0147",
    "category": "relationships",
    "difficulty": "brutal",
    "text": "Apologise sincerely without defending yourself. Do it without overthinking."
  },
  {
    "id": "c0148",
    "category": "relationships",
    "difficulty": "brutal",
    "text": "Ask someone whether there is unresolved tension between you. Do it without overthinking."
  },
  {
    "id": "c0149",
    "category": "relationships",
    "difficulty": "brutal",
    "text": "Set a boundary you have repeatedly failed to maintain. Do it without overthinking."
  },
  {
    "id": "c0150",
    "category": "relationships",
    "difficulty": "brutal",
    "text": "Tell someone an important truth you are afraid to say. Do it without overthinking."
  },
  {
    "id": "c0151",
    "category": "relationships",
    "difficulty": "brutal",
    "text": "Repair a relationship through direct action. Do it without overthinking."
  },
  {
    "id": "c0152",
    "category": "relationships",
    "difficulty": "brutal",
    "text": "Let go of a grudge and communicate your intention. Do it without overthinking."
  },
  {
    "id": "c0153",
    "category": "relationships",
    "difficulty": "brutal",
    "text": "Address a long-running unresolved issue. Do it and record that you did it."
  },
  {
    "id": "c0154",
    "category": "relationships",
    "difficulty": "brutal",
    "text": "Have the difficult conversation you have postponed. Do it and record that you did it."
  },
  {
    "id": "c0155",
    "category": "relationships",
    "difficulty": "brutal",
    "text": "Apologise sincerely without defending yourself. Do it and record that you did it."
  },
  {
    "id": "c0156",
    "category": "relationships",
    "difficulty": "brutal",
    "text": "Ask someone whether there is unresolved tension between you. Do it and record that you did it."
  },
  {
    "id": "c0157",
    "category": "relationships",
    "difficulty": "brutal",
    "text": "Set a boundary you have repeatedly failed to maintain. Do it and record that you did it."
  },
  {
    "id": "c0158",
    "category": "relationships",
    "difficulty": "brutal",
    "text": "Tell someone an important truth you are afraid to say. Do it and record that you did it."
  },
  {
    "id": "c0159",
    "category": "relationships",
    "difficulty": "brutal",
    "text": "Repair a relationship through direct action. Do it and record that you did it."
  },
  {
    "id": "c0160",
    "category": "relationships",
    "difficulty": "brutal",
    "text": "Let go of a grudge and communicate your intention. Do it and record that you did it."
  },
  {
    "id": "c0161",
    "category": "relationships",
    "difficulty": "wild",
    "text": "Let Fate choose someone from your contacts and send a kind message"
  },
  {
    "id": "c0162",
    "category": "relationships",
    "difficulty": "wild",
    "text": "Invite someone unexpected to do something spontaneous"
  },
  {
    "id": "c0163",
    "category": "relationships",
    "difficulty": "wild",
    "text": "Spend an evening saying yes to genuine connection"
  },
  {
    "id": "c0164",
    "category": "relationships",
    "difficulty": "wild",
    "text": "Write and send a letter instead of a text"
  },
  {
    "id": "c0165",
    "category": "relationships",
    "difficulty": "wild",
    "text": "Ask someone a question you have never dared to ask"
  },
  {
    "id": "c0166",
    "category": "relationships",
    "difficulty": "wild",
    "text": "Give an anonymous act of appreciation"
  },
  {
    "id": "c0167",
    "category": "relationships",
    "difficulty": "wild",
    "text": "Create a surprise for someone you care about"
  },
  {
    "id": "c0168",
    "category": "relationships",
    "difficulty": "wild",
    "text": "Reconnect using the oldest contact thread you can find"
  },
  {
    "id": "c0169",
    "category": "relationships",
    "difficulty": "wild",
    "text": "Let Fate choose someone from your contacts and send a kind message. Do it now."
  },
  {
    "id": "c0170",
    "category": "relationships",
    "difficulty": "wild",
    "text": "Invite someone unexpected to do something spontaneous. Do it now."
  },
  {
    "id": "c0171",
    "category": "relationships",
    "difficulty": "wild",
    "text": "Spend an evening saying yes to genuine connection. Do it now."
  },
  {
    "id": "c0172",
    "category": "relationships",
    "difficulty": "wild",
    "text": "Write and send a letter instead of a text. Do it now."
  },
  {
    "id": "c0173",
    "category": "relationships",
    "difficulty": "wild",
    "text": "Ask someone a question you have never dared to ask. Do it now."
  },
  {
    "id": "c0174",
    "category": "relationships",
    "difficulty": "wild",
    "text": "Give an anonymous act of appreciation. Do it now."
  },
  {
    "id": "c0175",
    "category": "relationships",
    "difficulty": "wild",
    "text": "Create a surprise for someone you care about. Do it now."
  },
  {
    "id": "c0176",
    "category": "relationships",
    "difficulty": "wild",
    "text": "Reconnect using the oldest contact thread you can find. Do it now."
  },
  {
    "id": "c0177",
    "category": "relationships",
    "difficulty": "wild",
    "text": "Let Fate choose someone from your contacts and send a kind message. Do it before the end of today."
  },
  {
    "id": "c0178",
    "category": "relationships",
    "difficulty": "wild",
    "text": "Invite someone unexpected to do something spontaneous. Do it before the end of today."
  },
  {
    "id": "c0179",
    "category": "relationships",
    "difficulty": "wild",
    "text": "Spend an evening saying yes to genuine connection. Do it before the end of today."
  },
  {
    "id": "c0180",
    "category": "relationships",
    "difficulty": "wild",
    "text": "Write and send a letter instead of a text. Do it before the end of today."
  },
  {
    "id": "c0181",
    "category": "relationships",
    "difficulty": "wild",
    "text": "Ask someone a question you have never dared to ask. Do it before the end of today."
  },
  {
    "id": "c0182",
    "category": "relationships",
    "difficulty": "wild",
    "text": "Give an anonymous act of appreciation. Do it before the end of today."
  },
  {
    "id": "c0183",
    "category": "relationships",
    "difficulty": "wild",
    "text": "Create a surprise for someone you care about. Do it before the end of today."
  },
  {
    "id": "c0184",
    "category": "relationships",
    "difficulty": "wild",
    "text": "Reconnect using the oldest contact thread you can find. Do it before the end of today."
  },
  {
    "id": "c0185",
    "category": "relationships",
    "difficulty": "wild",
    "text": "Let Fate choose someone from your contacts and send a kind message. Do it without overthinking."
  },
  {
    "id": "c0186",
    "category": "relationships",
    "difficulty": "wild",
    "text": "Invite someone unexpected to do something spontaneous. Do it without overthinking."
  },
  {
    "id": "c0187",
    "category": "relationships",
    "difficulty": "wild",
    "text": "Spend an evening saying yes to genuine connection. Do it without overthinking."
  },
  {
    "id": "c0188",
    "category": "relationships",
    "difficulty": "wild",
    "text": "Write and send a letter instead of a text. Do it without overthinking."
  },
  {
    "id": "c0189",
    "category": "relationships",
    "difficulty": "wild",
    "text": "Ask someone a question you have never dared to ask. Do it without overthinking."
  },
  {
    "id": "c0190",
    "category": "relationships",
    "difficulty": "wild",
    "text": "Give an anonymous act of appreciation. Do it without overthinking."
  },
  {
    "id": "c0191",
    "category": "relationships",
    "difficulty": "wild",
    "text": "Create a surprise for someone you care about. Do it without overthinking."
  },
  {
    "id": "c0192",
    "category": "relationships",
    "difficulty": "wild",
    "text": "Reconnect using the oldest contact thread you can find. Do it without overthinking."
  },
  {
    "id": "c0193",
    "category": "relationships",
    "difficulty": "wild",
    "text": "Let Fate choose someone from your contacts and send a kind message. Do it and record that you did it."
  },
  {
    "id": "c0194",
    "category": "relationships",
    "difficulty": "wild",
    "text": "Invite someone unexpected to do something spontaneous. Do it and record that you did it."
  },
  {
    "id": "c0195",
    "category": "relationships",
    "difficulty": "wild",
    "text": "Spend an evening saying yes to genuine connection. Do it and record that you did it."
  },
  {
    "id": "c0196",
    "category": "relationships",
    "difficulty": "wild",
    "text": "Write and send a letter instead of a text. Do it and record that you did it."
  },
  {
    "id": "c0197",
    "category": "relationships",
    "difficulty": "wild",
    "text": "Ask someone a question you have never dared to ask. Do it and record that you did it."
  },
  {
    "id": "c0198",
    "category": "relationships",
    "difficulty": "wild",
    "text": "Give an anonymous act of appreciation. Do it and record that you did it."
  },
  {
    "id": "c0199",
    "category": "relationships",
    "difficulty": "wild",
    "text": "Create a surprise for someone you care about. Do it and record that you did it."
  },
  {
    "id": "c0200",
    "category": "relationships",
    "difficulty": "wild",
    "text": "Reconnect using the oldest contact thread you can find. Do it and record that you did it."
  },
  {
    "id": "c0201",
    "category": "finance",
    "difficulty": "easy",
    "text": "Check your current bank balance without judgement"
  },
  {
    "id": "c0202",
    "category": "finance",
    "difficulty": "easy",
    "text": "Cancel one unused subscription"
  },
  {
    "id": "c0203",
    "category": "finance",
    "difficulty": "easy",
    "text": "Move a small amount into savings"
  },
  {
    "id": "c0204",
    "category": "finance",
    "difficulty": "easy",
    "text": "Review one recent purchase"
  },
  {
    "id": "c0205",
    "category": "finance",
    "difficulty": "easy",
    "text": "Write down one financial goal"
  },
  {
    "id": "c0206",
    "category": "finance",
    "difficulty": "easy",
    "text": "Compare the price of something you regularly buy"
  },
  {
    "id": "c0207",
    "category": "finance",
    "difficulty": "easy",
    "text": "Find one way to reduce a recurring expense"
  },
  {
    "id": "c0208",
    "category": "finance",
    "difficulty": "easy",
    "text": "Check whether you are paying for a service you no longer use"
  },
  {
    "id": "c0209",
    "category": "finance",
    "difficulty": "easy",
    "text": "Check your current bank balance without judgement. Do it now."
  },
  {
    "id": "c0210",
    "category": "finance",
    "difficulty": "easy",
    "text": "Cancel one unused subscription. Do it now."
  },
  {
    "id": "c0211",
    "category": "finance",
    "difficulty": "easy",
    "text": "Move a small amount into savings. Do it now."
  },
  {
    "id": "c0212",
    "category": "finance",
    "difficulty": "easy",
    "text": "Review one recent purchase. Do it now."
  },
  {
    "id": "c0213",
    "category": "finance",
    "difficulty": "easy",
    "text": "Write down one financial goal. Do it now."
  },
  {
    "id": "c0214",
    "category": "finance",
    "difficulty": "easy",
    "text": "Compare the price of something you regularly buy. Do it now."
  },
  {
    "id": "c0215",
    "category": "finance",
    "difficulty": "easy",
    "text": "Find one way to reduce a recurring expense. Do it now."
  },
  {
    "id": "c0216",
    "category": "finance",
    "difficulty": "easy",
    "text": "Check whether you are paying for a service you no longer use. Do it now."
  },
  {
    "id": "c0217",
    "category": "finance",
    "difficulty": "easy",
    "text": "Check your current bank balance without judgement. Do it before the end of today."
  },
  {
    "id": "c0218",
    "category": "finance",
    "difficulty": "easy",
    "text": "Cancel one unused subscription. Do it before the end of today."
  },
  {
    "id": "c0219",
    "category": "finance",
    "difficulty": "easy",
    "text": "Move a small amount into savings. Do it before the end of today."
  },
  {
    "id": "c0220",
    "category": "finance",
    "difficulty": "easy",
    "text": "Review one recent purchase. Do it before the end of today."
  },
  {
    "id": "c0221",
    "category": "finance",
    "difficulty": "easy",
    "text": "Write down one financial goal. Do it before the end of today."
  },
  {
    "id": "c0222",
    "category": "finance",
    "difficulty": "easy",
    "text": "Compare the price of something you regularly buy. Do it before the end of today."
  },
  {
    "id": "c0223",
    "category": "finance",
    "difficulty": "easy",
    "text": "Find one way to reduce a recurring expense. Do it before the end of today."
  },
  {
    "id": "c0224",
    "category": "finance",
    "difficulty": "easy",
    "text": "Check whether you are paying for a service you no longer use. Do it before the end of today."
  },
  {
    "id": "c0225",
    "category": "finance",
    "difficulty": "easy",
    "text": "Check your current bank balance without judgement. Do it without overthinking."
  },
  {
    "id": "c0226",
    "category": "finance",
    "difficulty": "easy",
    "text": "Cancel one unused subscription. Do it without overthinking."
  },
  {
    "id": "c0227",
    "category": "finance",
    "difficulty": "easy",
    "text": "Move a small amount into savings. Do it without overthinking."
  },
  {
    "id": "c0228",
    "category": "finance",
    "difficulty": "easy",
    "text": "Review one recent purchase. Do it without overthinking."
  },
  {
    "id": "c0229",
    "category": "finance",
    "difficulty": "easy",
    "text": "Write down one financial goal. Do it without overthinking."
  },
  {
    "id": "c0230",
    "category": "finance",
    "difficulty": "easy",
    "text": "Compare the price of something you regularly buy. Do it without overthinking."
  },
  {
    "id": "c0231",
    "category": "finance",
    "difficulty": "easy",
    "text": "Find one way to reduce a recurring expense. Do it without overthinking."
  },
  {
    "id": "c0232",
    "category": "finance",
    "difficulty": "easy",
    "text": "Check whether you are paying for a service you no longer use. Do it without overthinking."
  },
  {
    "id": "c0233",
    "category": "finance",
    "difficulty": "easy",
    "text": "Check your current bank balance without judgement. Do it and record that you did it."
  },
  {
    "id": "c0234",
    "category": "finance",
    "difficulty": "easy",
    "text": "Cancel one unused subscription. Do it and record that you did it."
  },
  {
    "id": "c0235",
    "category": "finance",
    "difficulty": "easy",
    "text": "Move a small amount into savings. Do it and record that you did it."
  },
  {
    "id": "c0236",
    "category": "finance",
    "difficulty": "easy",
    "text": "Review one recent purchase. Do it and record that you did it."
  },
  {
    "id": "c0237",
    "category": "finance",
    "difficulty": "easy",
    "text": "Write down one financial goal. Do it and record that you did it."
  },
  {
    "id": "c0238",
    "category": "finance",
    "difficulty": "easy",
    "text": "Compare the price of something you regularly buy. Do it and record that you did it."
  },
  {
    "id": "c0239",
    "category": "finance",
    "difficulty": "easy",
    "text": "Find one way to reduce a recurring expense. Do it and record that you did it."
  },
  {
    "id": "c0240",
    "category": "finance",
    "difficulty": "easy",
    "text": "Check whether you are paying for a service you no longer use. Do it and record that you did it."
  },
  {
    "id": "c0241",
    "category": "finance",
    "difficulty": "normal",
    "text": "Create a simple monthly spending snapshot"
  },
  {
    "id": "c0242",
    "category": "finance",
    "difficulty": "normal",
    "text": "Set up an automatic savings transfer"
  },
  {
    "id": "c0243",
    "category": "finance",
    "difficulty": "normal",
    "text": "Sell one item you no longer need"
  },
  {
    "id": "c0244",
    "category": "finance",
    "difficulty": "normal",
    "text": "Plan your spending for the next seven days"
  },
  {
    "id": "c0245",
    "category": "finance",
    "difficulty": "normal",
    "text": "Compare your utility or insurance options"
  },
  {
    "id": "c0246",
    "category": "finance",
    "difficulty": "normal",
    "text": "Create a realistic savings target"
  },
  {
    "id": "c0247",
    "category": "finance",
    "difficulty": "normal",
    "text": "Review your three biggest monthly expenses"
  },
  {
    "id": "c0248",
    "category": "finance",
    "difficulty": "normal",
    "text": "Build a small emergency fund plan"
  },
  {
    "id": "c0249",
    "category": "finance",
    "difficulty": "normal",
    "text": "Create a simple monthly spending snapshot. Do it now."
  },
  {
    "id": "c0250",
    "category": "finance",
    "difficulty": "normal",
    "text": "Set up an automatic savings transfer. Do it now."
  },
  {
    "id": "c0251",
    "category": "finance",
    "difficulty": "normal",
    "text": "Sell one item you no longer need. Do it now."
  },
  {
    "id": "c0252",
    "category": "finance",
    "difficulty": "normal",
    "text": "Plan your spending for the next seven days. Do it now."
  },
  {
    "id": "c0253",
    "category": "finance",
    "difficulty": "normal",
    "text": "Compare your utility or insurance options. Do it now."
  },
  {
    "id": "c0254",
    "category": "finance",
    "difficulty": "normal",
    "text": "Create a realistic savings target. Do it now."
  },
  {
    "id": "c0255",
    "category": "finance",
    "difficulty": "normal",
    "text": "Review your three biggest monthly expenses. Do it now."
  },
  {
    "id": "c0256",
    "category": "finance",
    "difficulty": "normal",
    "text": "Build a small emergency fund plan. Do it now."
  },
  {
    "id": "c0257",
    "category": "finance",
    "difficulty": "normal",
    "text": "Create a simple monthly spending snapshot. Do it before the end of today."
  },
  {
    "id": "c0258",
    "category": "finance",
    "difficulty": "normal",
    "text": "Set up an automatic savings transfer. Do it before the end of today."
  },
  {
    "id": "c0259",
    "category": "finance",
    "difficulty": "normal",
    "text": "Sell one item you no longer need. Do it before the end of today."
  },
  {
    "id": "c0260",
    "category": "finance",
    "difficulty": "normal",
    "text": "Plan your spending for the next seven days. Do it before the end of today."
  },
  {
    "id": "c0261",
    "category": "finance",
    "difficulty": "normal",
    "text": "Compare your utility or insurance options. Do it before the end of today."
  },
  {
    "id": "c0262",
    "category": "finance",
    "difficulty": "normal",
    "text": "Create a realistic savings target. Do it before the end of today."
  },
  {
    "id": "c0263",
    "category": "finance",
    "difficulty": "normal",
    "text": "Review your three biggest monthly expenses. Do it before the end of today."
  },
  {
    "id": "c0264",
    "category": "finance",
    "difficulty": "normal",
    "text": "Build a small emergency fund plan. Do it before the end of today."
  },
  {
    "id": "c0265",
    "category": "finance",
    "difficulty": "normal",
    "text": "Create a simple monthly spending snapshot. Do it without overthinking."
  },
  {
    "id": "c0266",
    "category": "finance",
    "difficulty": "normal",
    "text": "Set up an automatic savings transfer. Do it without overthinking."
  },
  {
    "id": "c0267",
    "category": "finance",
    "difficulty": "normal",
    "text": "Sell one item you no longer need. Do it without overthinking."
  },
  {
    "id": "c0268",
    "category": "finance",
    "difficulty": "normal",
    "text": "Plan your spending for the next seven days. Do it without overthinking."
  },
  {
    "id": "c0269",
    "category": "finance",
    "difficulty": "normal",
    "text": "Compare your utility or insurance options. Do it without overthinking."
  },
  {
    "id": "c0270",
    "category": "finance",
    "difficulty": "normal",
    "text": "Create a realistic savings target. Do it without overthinking."
  },
  {
    "id": "c0271",
    "category": "finance",
    "difficulty": "normal",
    "text": "Review your three biggest monthly expenses. Do it without overthinking."
  },
  {
    "id": "c0272",
    "category": "finance",
    "difficulty": "normal",
    "text": "Build a small emergency fund plan. Do it without overthinking."
  },
  {
    "id": "c0273",
    "category": "finance",
    "difficulty": "normal",
    "text": "Create a simple monthly spending snapshot. Do it and record that you did it."
  },
  {
    "id": "c0274",
    "category": "finance",
    "difficulty": "normal",
    "text": "Set up an automatic savings transfer. Do it and record that you did it."
  },
  {
    "id": "c0275",
    "category": "finance",
    "difficulty": "normal",
    "text": "Sell one item you no longer need. Do it and record that you did it."
  },
  {
    "id": "c0276",
    "category": "finance",
    "difficulty": "normal",
    "text": "Plan your spending for the next seven days. Do it and record that you did it."
  },
  {
    "id": "c0277",
    "category": "finance",
    "difficulty": "normal",
    "text": "Compare your utility or insurance options. Do it and record that you did it."
  },
  {
    "id": "c0278",
    "category": "finance",
    "difficulty": "normal",
    "text": "Create a realistic savings target. Do it and record that you did it."
  },
  {
    "id": "c0279",
    "category": "finance",
    "difficulty": "normal",
    "text": "Review your three biggest monthly expenses. Do it and record that you did it."
  },
  {
    "id": "c0280",
    "category": "finance",
    "difficulty": "normal",
    "text": "Build a small emergency fund plan. Do it and record that you did it."
  },
  {
    "id": "c0281",
    "category": "finance",
    "difficulty": "challenge",
    "text": "Make a full list of your debts or financial commitments"
  },
  {
    "id": "c0282",
    "category": "finance",
    "difficulty": "challenge",
    "text": "Negotiate a bill or recurring cost"
  },
  {
    "id": "c0283",
    "category": "finance",
    "difficulty": "challenge",
    "text": "Create a three-month financial plan"
  },
  {
    "id": "c0284",
    "category": "finance",
    "difficulty": "challenge",
    "text": "Have an honest conversation about money with someone affected"
  },
  {
    "id": "c0285",
    "category": "finance",
    "difficulty": "challenge",
    "text": "Stop one habitual spending trigger for a week"
  },
  {
    "id": "c0286",
    "category": "finance",
    "difficulty": "challenge",
    "text": "Calculate your true monthly discretionary spending"
  },
  {
    "id": "c0287",
    "category": "finance",
    "difficulty": "challenge",
    "text": "Create a debt repayment strategy"
  },
  {
    "id": "c0288",
    "category": "finance",
    "difficulty": "challenge",
    "text": "Research a better account or savings option"
  },
  {
    "id": "c0289",
    "category": "finance",
    "difficulty": "challenge",
    "text": "Make a full list of your debts or financial commitments. Do it now."
  },
  {
    "id": "c0290",
    "category": "finance",
    "difficulty": "challenge",
    "text": "Negotiate a bill or recurring cost. Do it now."
  },
  {
    "id": "c0291",
    "category": "finance",
    "difficulty": "challenge",
    "text": "Create a three-month financial plan. Do it now."
  },
  {
    "id": "c0292",
    "category": "finance",
    "difficulty": "challenge",
    "text": "Have an honest conversation about money with someone affected. Do it now."
  },
  {
    "id": "c0293",
    "category": "finance",
    "difficulty": "challenge",
    "text": "Stop one habitual spending trigger for a week. Do it now."
  },
  {
    "id": "c0294",
    "category": "finance",
    "difficulty": "challenge",
    "text": "Calculate your true monthly discretionary spending. Do it now."
  },
  {
    "id": "c0295",
    "category": "finance",
    "difficulty": "challenge",
    "text": "Create a debt repayment strategy. Do it now."
  },
  {
    "id": "c0296",
    "category": "finance",
    "difficulty": "challenge",
    "text": "Research a better account or savings option. Do it now."
  },
  {
    "id": "c0297",
    "category": "finance",
    "difficulty": "challenge",
    "text": "Make a full list of your debts or financial commitments. Do it before the end of today."
  },
  {
    "id": "c0298",
    "category": "finance",
    "difficulty": "challenge",
    "text": "Negotiate a bill or recurring cost. Do it before the end of today."
  },
  {
    "id": "c0299",
    "category": "finance",
    "difficulty": "challenge",
    "text": "Create a three-month financial plan. Do it before the end of today."
  },
  {
    "id": "c0300",
    "category": "finance",
    "difficulty": "challenge",
    "text": "Have an honest conversation about money with someone affected. Do it before the end of today."
  },
  {
    "id": "c0301",
    "category": "finance",
    "difficulty": "challenge",
    "text": "Stop one habitual spending trigger for a week. Do it before the end of today."
  },
  {
    "id": "c0302",
    "category": "finance",
    "difficulty": "challenge",
    "text": "Calculate your true monthly discretionary spending. Do it before the end of today."
  },
  {
    "id": "c0303",
    "category": "finance",
    "difficulty": "challenge",
    "text": "Create a debt repayment strategy. Do it before the end of today."
  },
  {
    "id": "c0304",
    "category": "finance",
    "difficulty": "challenge",
    "text": "Research a better account or savings option. Do it before the end of today."
  },
  {
    "id": "c0305",
    "category": "finance",
    "difficulty": "challenge",
    "text": "Make a full list of your debts or financial commitments. Do it without overthinking."
  },
  {
    "id": "c0306",
    "category": "finance",
    "difficulty": "challenge",
    "text": "Negotiate a bill or recurring cost. Do it without overthinking."
  },
  {
    "id": "c0307",
    "category": "finance",
    "difficulty": "challenge",
    "text": "Create a three-month financial plan. Do it without overthinking."
  },
  {
    "id": "c0308",
    "category": "finance",
    "difficulty": "challenge",
    "text": "Have an honest conversation about money with someone affected. Do it without overthinking."
  },
  {
    "id": "c0309",
    "category": "finance",
    "difficulty": "challenge",
    "text": "Stop one habitual spending trigger for a week. Do it without overthinking."
  },
  {
    "id": "c0310",
    "category": "finance",
    "difficulty": "challenge",
    "text": "Calculate your true monthly discretionary spending. Do it without overthinking."
  },
  {
    "id": "c0311",
    "category": "finance",
    "difficulty": "challenge",
    "text": "Create a debt repayment strategy. Do it without overthinking."
  },
  {
    "id": "c0312",
    "category": "finance",
    "difficulty": "challenge",
    "text": "Research a better account or savings option. Do it without overthinking."
  },
  {
    "id": "c0313",
    "category": "finance",
    "difficulty": "challenge",
    "text": "Make a full list of your debts or financial commitments. Do it and record that you did it."
  },
  {
    "id": "c0314",
    "category": "finance",
    "difficulty": "challenge",
    "text": "Negotiate a bill or recurring cost. Do it and record that you did it."
  },
  {
    "id": "c0315",
    "category": "finance",
    "difficulty": "challenge",
    "text": "Create a three-month financial plan. Do it and record that you did it."
  },
  {
    "id": "c0316",
    "category": "finance",
    "difficulty": "challenge",
    "text": "Have an honest conversation about money with someone affected. Do it and record that you did it."
  },
  {
    "id": "c0317",
    "category": "finance",
    "difficulty": "challenge",
    "text": "Stop one habitual spending trigger for a week. Do it and record that you did it."
  },
  {
    "id": "c0318",
    "category": "finance",
    "difficulty": "challenge",
    "text": "Calculate your true monthly discretionary spending. Do it and record that you did it."
  },
  {
    "id": "c0319",
    "category": "finance",
    "difficulty": "challenge",
    "text": "Create a debt repayment strategy. Do it and record that you did it."
  },
  {
    "id": "c0320",
    "category": "finance",
    "difficulty": "challenge",
    "text": "Research a better account or savings option. Do it and record that you did it."
  },
  {
    "id": "c0321",
    "category": "finance",
    "difficulty": "brutal",
    "text": "Complete a full personal financial audit"
  },
  {
    "id": "c0322",
    "category": "finance",
    "difficulty": "brutal",
    "text": "Cut a significant unnecessary expense for one month"
  },
  {
    "id": "c0323",
    "category": "finance",
    "difficulty": "brutal",
    "text": "Make a difficult decision about a financially draining commitment"
  },
  {
    "id": "c0324",
    "category": "finance",
    "difficulty": "brutal",
    "text": "Build a six-month financial recovery plan"
  },
  {
    "id": "c0325",
    "category": "finance",
    "difficulty": "brutal",
    "text": "Confront a financial problem you have been ignoring"
  },
  {
    "id": "c0326",
    "category": "finance",
    "difficulty": "brutal",
    "text": "Call a provider and actively negotiate a better deal"
  },
  {
    "id": "c0327",
    "category": "finance",
    "difficulty": "brutal",
    "text": "Create a realistic plan to tackle your largest financial concern"
  },
  {
    "id": "c0328",
    "category": "finance",
    "difficulty": "brutal",
    "text": "Go seven days without discretionary spending"
  },
  {
    "id": "c0329",
    "category": "finance",
    "difficulty": "brutal",
    "text": "Complete a full personal financial audit. Do it now."
  },
  {
    "id": "c0330",
    "category": "finance",
    "difficulty": "brutal",
    "text": "Cut a significant unnecessary expense for one month. Do it now."
  },
  {
    "id": "c0331",
    "category": "finance",
    "difficulty": "brutal",
    "text": "Make a difficult decision about a financially draining commitment. Do it now."
  },
  {
    "id": "c0332",
    "category": "finance",
    "difficulty": "brutal",
    "text": "Build a six-month financial recovery plan. Do it now."
  },
  {
    "id": "c0333",
    "category": "finance",
    "difficulty": "brutal",
    "text": "Confront a financial problem you have been ignoring. Do it now."
  },
  {
    "id": "c0334",
    "category": "finance",
    "difficulty": "brutal",
    "text": "Call a provider and actively negotiate a better deal. Do it now."
  },
  {
    "id": "c0335",
    "category": "finance",
    "difficulty": "brutal",
    "text": "Create a realistic plan to tackle your largest financial concern. Do it now."
  },
  {
    "id": "c0336",
    "category": "finance",
    "difficulty": "brutal",
    "text": "Go seven days without discretionary spending. Do it now."
  },
  {
    "id": "c0337",
    "category": "finance",
    "difficulty": "brutal",
    "text": "Complete a full personal financial audit. Do it before the end of today."
  },
  {
    "id": "c0338",
    "category": "finance",
    "difficulty": "brutal",
    "text": "Cut a significant unnecessary expense for one month. Do it before the end of today."
  },
  {
    "id": "c0339",
    "category": "finance",
    "difficulty": "brutal",
    "text": "Make a difficult decision about a financially draining commitment. Do it before the end of today."
  },
  {
    "id": "c0340",
    "category": "finance",
    "difficulty": "brutal",
    "text": "Build a six-month financial recovery plan. Do it before the end of today."
  },
  {
    "id": "c0341",
    "category": "finance",
    "difficulty": "brutal",
    "text": "Confront a financial problem you have been ignoring. Do it before the end of today."
  },
  {
    "id": "c0342",
    "category": "finance",
    "difficulty": "brutal",
    "text": "Call a provider and actively negotiate a better deal. Do it before the end of today."
  },
  {
    "id": "c0343",
    "category": "finance",
    "difficulty": "brutal",
    "text": "Create a realistic plan to tackle your largest financial concern. Do it before the end of today."
  },
  {
    "id": "c0344",
    "category": "finance",
    "difficulty": "brutal",
    "text": "Go seven days without discretionary spending. Do it before the end of today."
  },
  {
    "id": "c0345",
    "category": "finance",
    "difficulty": "brutal",
    "text": "Complete a full personal financial audit. Do it without overthinking."
  },
  {
    "id": "c0346",
    "category": "finance",
    "difficulty": "brutal",
    "text": "Cut a significant unnecessary expense for one month. Do it without overthinking."
  },
  {
    "id": "c0347",
    "category": "finance",
    "difficulty": "brutal",
    "text": "Make a difficult decision about a financially draining commitment. Do it without overthinking."
  },
  {
    "id": "c0348",
    "category": "finance",
    "difficulty": "brutal",
    "text": "Build a six-month financial recovery plan. Do it without overthinking."
  },
  {
    "id": "c0349",
    "category": "finance",
    "difficulty": "brutal",
    "text": "Confront a financial problem you have been ignoring. Do it without overthinking."
  },
  {
    "id": "c0350",
    "category": "finance",
    "difficulty": "brutal",
    "text": "Call a provider and actively negotiate a better deal. Do it without overthinking."
  },
  {
    "id": "c0351",
    "category": "finance",
    "difficulty": "brutal",
    "text": "Create a realistic plan to tackle your largest financial concern. Do it without overthinking."
  },
  {
    "id": "c0352",
    "category": "finance",
    "difficulty": "brutal",
    "text": "Go seven days without discretionary spending. Do it without overthinking."
  },
  {
    "id": "c0353",
    "category": "finance",
    "difficulty": "brutal",
    "text": "Complete a full personal financial audit. Do it and record that you did it."
  },
  {
    "id": "c0354",
    "category": "finance",
    "difficulty": "brutal",
    "text": "Cut a significant unnecessary expense for one month. Do it and record that you did it."
  },
  {
    "id": "c0355",
    "category": "finance",
    "difficulty": "brutal",
    "text": "Make a difficult decision about a financially draining commitment. Do it and record that you did it."
  },
  {
    "id": "c0356",
    "category": "finance",
    "difficulty": "brutal",
    "text": "Build a six-month financial recovery plan. Do it and record that you did it."
  },
  {
    "id": "c0357",
    "category": "finance",
    "difficulty": "brutal",
    "text": "Confront a financial problem you have been ignoring. Do it and record that you did it."
  },
  {
    "id": "c0358",
    "category": "finance",
    "difficulty": "brutal",
    "text": "Call a provider and actively negotiate a better deal. Do it and record that you did it."
  },
  {
    "id": "c0359",
    "category": "finance",
    "difficulty": "brutal",
    "text": "Create a realistic plan to tackle your largest financial concern. Do it and record that you did it."
  },
  {
    "id": "c0360",
    "category": "finance",
    "difficulty": "brutal",
    "text": "Go seven days without discretionary spending. Do it and record that you did it."
  },
  {
    "id": "c0361",
    "category": "finance",
    "difficulty": "wild",
    "text": "Spend a day buying absolutely nothing"
  },
  {
    "id": "c0362",
    "category": "finance",
    "difficulty": "wild",
    "text": "Let a random number decide how much you save today"
  },
  {
    "id": "c0363",
    "category": "finance",
    "difficulty": "wild",
    "text": "Try a no-spend challenge with a friend"
  },
  {
    "id": "c0364",
    "category": "finance",
    "difficulty": "wild",
    "text": "Turn one unused possession into cash within seven days"
  },
  {
    "id": "c0365",
    "category": "finance",
    "difficulty": "wild",
    "text": "Create a financial challenge jar for the month"
  },
  {
    "id": "c0366",
    "category": "finance",
    "difficulty": "wild",
    "text": "Give every pound of spare change a deliberate destination"
  },
  {
    "id": "c0367",
    "category": "finance",
    "difficulty": "wild",
    "text": "Audit every subscription in one sitting"
  },
  {
    "id": "c0368",
    "category": "finance",
    "difficulty": "wild",
    "text": "Make your next purchase only after waiting 24 hours"
  },
  {
    "id": "c0369",
    "category": "finance",
    "difficulty": "wild",
    "text": "Spend a day buying absolutely nothing. Do it now."
  },
  {
    "id": "c0370",
    "category": "finance",
    "difficulty": "wild",
    "text": "Let a random number decide how much you save today. Do it now."
  },
  {
    "id": "c0371",
    "category": "finance",
    "difficulty": "wild",
    "text": "Try a no-spend challenge with a friend. Do it now."
  },
  {
    "id": "c0372",
    "category": "finance",
    "difficulty": "wild",
    "text": "Turn one unused possession into cash within seven days. Do it now."
  },
  {
    "id": "c0373",
    "category": "finance",
    "difficulty": "wild",
    "text": "Create a financial challenge jar for the month. Do it now."
  },
  {
    "id": "c0374",
    "category": "finance",
    "difficulty": "wild",
    "text": "Give every pound of spare change a deliberate destination. Do it now."
  },
  {
    "id": "c0375",
    "category": "finance",
    "difficulty": "wild",
    "text": "Audit every subscription in one sitting. Do it now."
  },
  {
    "id": "c0376",
    "category": "finance",
    "difficulty": "wild",
    "text": "Make your next purchase only after waiting 24 hours. Do it now."
  },
  {
    "id": "c0377",
    "category": "finance",
    "difficulty": "wild",
    "text": "Spend a day buying absolutely nothing. Do it before the end of today."
  },
  {
    "id": "c0378",
    "category": "finance",
    "difficulty": "wild",
    "text": "Let a random number decide how much you save today. Do it before the end of today."
  },
  {
    "id": "c0379",
    "category": "finance",
    "difficulty": "wild",
    "text": "Try a no-spend challenge with a friend. Do it before the end of today."
  },
  {
    "id": "c0380",
    "category": "finance",
    "difficulty": "wild",
    "text": "Turn one unused possession into cash within seven days. Do it before the end of today."
  },
  {
    "id": "c0381",
    "category": "finance",
    "difficulty": "wild",
    "text": "Create a financial challenge jar for the month. Do it before the end of today."
  },
  {
    "id": "c0382",
    "category": "finance",
    "difficulty": "wild",
    "text": "Give every pound of spare change a deliberate destination. Do it before the end of today."
  },
  {
    "id": "c0383",
    "category": "finance",
    "difficulty": "wild",
    "text": "Audit every subscription in one sitting. Do it before the end of today."
  },
  {
    "id": "c0384",
    "category": "finance",
    "difficulty": "wild",
    "text": "Make your next purchase only after waiting 24 hours. Do it before the end of today."
  },
  {
    "id": "c0385",
    "category": "finance",
    "difficulty": "wild",
    "text": "Spend a day buying absolutely nothing. Do it without overthinking."
  },
  {
    "id": "c0386",
    "category": "finance",
    "difficulty": "wild",
    "text": "Let a random number decide how much you save today. Do it without overthinking."
  },
  {
    "id": "c0387",
    "category": "finance",
    "difficulty": "wild",
    "text": "Try a no-spend challenge with a friend. Do it without overthinking."
  },
  {
    "id": "c0388",
    "category": "finance",
    "difficulty": "wild",
    "text": "Turn one unused possession into cash within seven days. Do it without overthinking."
  },
  {
    "id": "c0389",
    "category": "finance",
    "difficulty": "wild",
    "text": "Create a financial challenge jar for the month. Do it without overthinking."
  },
  {
    "id": "c0390",
    "category": "finance",
    "difficulty": "wild",
    "text": "Give every pound of spare change a deliberate destination. Do it without overthinking."
  },
  {
    "id": "c0391",
    "category": "finance",
    "difficulty": "wild",
    "text": "Audit every subscription in one sitting. Do it without overthinking."
  },
  {
    "id": "c0392",
    "category": "finance",
    "difficulty": "wild",
    "text": "Make your next purchase only after waiting 24 hours. Do it without overthinking."
  },
  {
    "id": "c0393",
    "category": "finance",
    "difficulty": "wild",
    "text": "Spend a day buying absolutely nothing. Do it and record that you did it."
  },
  {
    "id": "c0394",
    "category": "finance",
    "difficulty": "wild",
    "text": "Let a random number decide how much you save today. Do it and record that you did it."
  },
  {
    "id": "c0395",
    "category": "finance",
    "difficulty": "wild",
    "text": "Try a no-spend challenge with a friend. Do it and record that you did it."
  },
  {
    "id": "c0396",
    "category": "finance",
    "difficulty": "wild",
    "text": "Turn one unused possession into cash within seven days. Do it and record that you did it."
  },
  {
    "id": "c0397",
    "category": "finance",
    "difficulty": "wild",
    "text": "Create a financial challenge jar for the month. Do it and record that you did it."
  },
  {
    "id": "c0398",
    "category": "finance",
    "difficulty": "wild",
    "text": "Give every pound of spare change a deliberate destination. Do it and record that you did it."
  },
  {
    "id": "c0399",
    "category": "finance",
    "difficulty": "wild",
    "text": "Audit every subscription in one sitting. Do it and record that you did it."
  },
  {
    "id": "c0400",
    "category": "finance",
    "difficulty": "wild",
    "text": "Make your next purchase only after waiting 24 hours. Do it and record that you did it."
  },
  {
    "id": "c0401",
    "category": "work",
    "difficulty": "easy",
    "text": "Clear one small work task you have been avoiding"
  },
  {
    "id": "c0402",
    "category": "work",
    "difficulty": "easy",
    "text": "Organise your desktop for ten minutes"
  },
  {
    "id": "c0403",
    "category": "work",
    "difficulty": "easy",
    "text": "Write down your top three priorities"
  },
  {
    "id": "c0404",
    "category": "work",
    "difficulty": "easy",
    "text": "Thank a colleague for their help"
  },
  {
    "id": "c0405",
    "category": "work",
    "difficulty": "easy",
    "text": "Finish one task before starting another"
  },
  {
    "id": "c0406",
    "category": "work",
    "difficulty": "easy",
    "text": "Turn off notifications for focused work"
  },
  {
    "id": "c0407",
    "category": "work",
    "difficulty": "easy",
    "text": "Document one useful process"
  },
  {
    "id": "c0408",
    "category": "work",
    "difficulty": "easy",
    "text": "Ask one clarifying question instead of making an assumption"
  },
  {
    "id": "c0409",
    "category": "work",
    "difficulty": "easy",
    "text": "Clear one small work task you have been avoiding. Do it now."
  },
  {
    "id": "c0410",
    "category": "work",
    "difficulty": "easy",
    "text": "Organise your desktop for ten minutes. Do it now."
  },
  {
    "id": "c0411",
    "category": "work",
    "difficulty": "easy",
    "text": "Write down your top three priorities. Do it now."
  },
  {
    "id": "c0412",
    "category": "work",
    "difficulty": "easy",
    "text": "Thank a colleague for their help. Do it now."
  },
  {
    "id": "c0413",
    "category": "work",
    "difficulty": "easy",
    "text": "Finish one task before starting another. Do it now."
  },
  {
    "id": "c0414",
    "category": "work",
    "difficulty": "easy",
    "text": "Turn off notifications for focused work. Do it now."
  },
  {
    "id": "c0415",
    "category": "work",
    "difficulty": "easy",
    "text": "Document one useful process. Do it now."
  },
  {
    "id": "c0416",
    "category": "work",
    "difficulty": "easy",
    "text": "Ask one clarifying question instead of making an assumption. Do it now."
  },
  {
    "id": "c0417",
    "category": "work",
    "difficulty": "easy",
    "text": "Clear one small work task you have been avoiding. Do it before the end of today."
  },
  {
    "id": "c0418",
    "category": "work",
    "difficulty": "easy",
    "text": "Organise your desktop for ten minutes. Do it before the end of today."
  },
  {
    "id": "c0419",
    "category": "work",
    "difficulty": "easy",
    "text": "Write down your top three priorities. Do it before the end of today."
  },
  {
    "id": "c0420",
    "category": "work",
    "difficulty": "easy",
    "text": "Thank a colleague for their help. Do it before the end of today."
  },
  {
    "id": "c0421",
    "category": "work",
    "difficulty": "easy",
    "text": "Finish one task before starting another. Do it before the end of today."
  },
  {
    "id": "c0422",
    "category": "work",
    "difficulty": "easy",
    "text": "Turn off notifications for focused work. Do it before the end of today."
  },
  {
    "id": "c0423",
    "category": "work",
    "difficulty": "easy",
    "text": "Document one useful process. Do it before the end of today."
  },
  {
    "id": "c0424",
    "category": "work",
    "difficulty": "easy",
    "text": "Ask one clarifying question instead of making an assumption. Do it before the end of today."
  },
  {
    "id": "c0425",
    "category": "work",
    "difficulty": "easy",
    "text": "Clear one small work task you have been avoiding. Do it without overthinking."
  },
  {
    "id": "c0426",
    "category": "work",
    "difficulty": "easy",
    "text": "Organise your desktop for ten minutes. Do it without overthinking."
  },
  {
    "id": "c0427",
    "category": "work",
    "difficulty": "easy",
    "text": "Write down your top three priorities. Do it without overthinking."
  },
  {
    "id": "c0428",
    "category": "work",
    "difficulty": "easy",
    "text": "Thank a colleague for their help. Do it without overthinking."
  },
  {
    "id": "c0429",
    "category": "work",
    "difficulty": "easy",
    "text": "Finish one task before starting another. Do it without overthinking."
  },
  {
    "id": "c0430",
    "category": "work",
    "difficulty": "easy",
    "text": "Turn off notifications for focused work. Do it without overthinking."
  },
  {
    "id": "c0431",
    "category": "work",
    "difficulty": "easy",
    "text": "Document one useful process. Do it without overthinking."
  },
  {
    "id": "c0432",
    "category": "work",
    "difficulty": "easy",
    "text": "Ask one clarifying question instead of making an assumption. Do it without overthinking."
  },
  {
    "id": "c0433",
    "category": "work",
    "difficulty": "easy",
    "text": "Clear one small work task you have been avoiding. Do it and record that you did it."
  },
  {
    "id": "c0434",
    "category": "work",
    "difficulty": "easy",
    "text": "Organise your desktop for ten minutes. Do it and record that you did it."
  },
  {
    "id": "c0435",
    "category": "work",
    "difficulty": "easy",
    "text": "Write down your top three priorities. Do it and record that you did it."
  },
  {
    "id": "c0436",
    "category": "work",
    "difficulty": "easy",
    "text": "Thank a colleague for their help. Do it and record that you did it."
  },
  {
    "id": "c0437",
    "category": "work",
    "difficulty": "easy",
    "text": "Finish one task before starting another. Do it and record that you did it."
  },
  {
    "id": "c0438",
    "category": "work",
    "difficulty": "easy",
    "text": "Turn off notifications for focused work. Do it and record that you did it."
  },
  {
    "id": "c0439",
    "category": "work",
    "difficulty": "easy",
    "text": "Document one useful process. Do it and record that you did it."
  },
  {
    "id": "c0440",
    "category": "work",
    "difficulty": "easy",
    "text": "Ask one clarifying question instead of making an assumption. Do it and record that you did it."
  },
  {
    "id": "c0441",
    "category": "work",
    "difficulty": "normal",
    "text": "Block out an hour for deep work"
  },
  {
    "id": "c0442",
    "category": "work",
    "difficulty": "normal",
    "text": "Improve one process you regularly complain about"
  },
  {
    "id": "c0443",
    "category": "work",
    "difficulty": "normal",
    "text": "Ask for feedback on a piece of work"
  },
  {
    "id": "c0444",
    "category": "work",
    "difficulty": "normal",
    "text": "Update your CV or portfolio"
  },
  {
    "id": "c0445",
    "category": "work",
    "difficulty": "normal",
    "text": "Learn one useful shortcut or skill"
  },
  {
    "id": "c0446",
    "category": "work",
    "difficulty": "normal",
    "text": "Prepare tomorrow's priorities before finishing today"
  },
  {
    "id": "c0447",
    "category": "work",
    "difficulty": "normal",
    "text": "Have a constructive conversation with a colleague"
  },
  {
    "id": "c0448",
    "category": "work",
    "difficulty": "normal",
    "text": "Remove one unnecessary meeting or commitment"
  },
  {
    "id": "c0449",
    "category": "work",
    "difficulty": "normal",
    "text": "Block out an hour for deep work. Do it now."
  },
  {
    "id": "c0450",
    "category": "work",
    "difficulty": "normal",
    "text": "Improve one process you regularly complain about. Do it now."
  },
  {
    "id": "c0451",
    "category": "work",
    "difficulty": "normal",
    "text": "Ask for feedback on a piece of work. Do it now."
  },
  {
    "id": "c0452",
    "category": "work",
    "difficulty": "normal",
    "text": "Update your CV or portfolio. Do it now."
  },
  {
    "id": "c0453",
    "category": "work",
    "difficulty": "normal",
    "text": "Learn one useful shortcut or skill. Do it now."
  },
  {
    "id": "c0454",
    "category": "work",
    "difficulty": "normal",
    "text": "Prepare tomorrow's priorities before finishing today. Do it now."
  },
  {
    "id": "c0455",
    "category": "work",
    "difficulty": "normal",
    "text": "Have a constructive conversation with a colleague. Do it now."
  },
  {
    "id": "c0456",
    "category": "work",
    "difficulty": "normal",
    "text": "Remove one unnecessary meeting or commitment. Do it now."
  },
  {
    "id": "c0457",
    "category": "work",
    "difficulty": "normal",
    "text": "Block out an hour for deep work. Do it before the end of today."
  },
  {
    "id": "c0458",
    "category": "work",
    "difficulty": "normal",
    "text": "Improve one process you regularly complain about. Do it before the end of today."
  },
  {
    "id": "c0459",
    "category": "work",
    "difficulty": "normal",
    "text": "Ask for feedback on a piece of work. Do it before the end of today."
  },
  {
    "id": "c0460",
    "category": "work",
    "difficulty": "normal",
    "text": "Update your CV or portfolio. Do it before the end of today."
  },
  {
    "id": "c0461",
    "category": "work",
    "difficulty": "normal",
    "text": "Learn one useful shortcut or skill. Do it before the end of today."
  },
  {
    "id": "c0462",
    "category": "work",
    "difficulty": "normal",
    "text": "Prepare tomorrow's priorities before finishing today. Do it before the end of today."
  },
  {
    "id": "c0463",
    "category": "work",
    "difficulty": "normal",
    "text": "Have a constructive conversation with a colleague. Do it before the end of today."
  },
  {
    "id": "c0464",
    "category": "work",
    "difficulty": "normal",
    "text": "Remove one unnecessary meeting or commitment. Do it before the end of today."
  },
  {
    "id": "c0465",
    "category": "work",
    "difficulty": "normal",
    "text": "Block out an hour for deep work. Do it without overthinking."
  },
  {
    "id": "c0466",
    "category": "work",
    "difficulty": "normal",
    "text": "Improve one process you regularly complain about. Do it without overthinking."
  },
  {
    "id": "c0467",
    "category": "work",
    "difficulty": "normal",
    "text": "Ask for feedback on a piece of work. Do it without overthinking."
  },
  {
    "id": "c0468",
    "category": "work",
    "difficulty": "normal",
    "text": "Update your CV or portfolio. Do it without overthinking."
  },
  {
    "id": "c0469",
    "category": "work",
    "difficulty": "normal",
    "text": "Learn one useful shortcut or skill. Do it without overthinking."
  },
  {
    "id": "c0470",
    "category": "work",
    "difficulty": "normal",
    "text": "Prepare tomorrow's priorities before finishing today. Do it without overthinking."
  },
  {
    "id": "c0471",
    "category": "work",
    "difficulty": "normal",
    "text": "Have a constructive conversation with a colleague. Do it without overthinking."
  },
  {
    "id": "c0472",
    "category": "work",
    "difficulty": "normal",
    "text": "Remove one unnecessary meeting or commitment. Do it without overthinking."
  },
  {
    "id": "c0473",
    "category": "work",
    "difficulty": "normal",
    "text": "Block out an hour for deep work. Do it and record that you did it."
  },
  {
    "id": "c0474",
    "category": "work",
    "difficulty": "normal",
    "text": "Improve one process you regularly complain about. Do it and record that you did it."
  },
  {
    "id": "c0475",
    "category": "work",
    "difficulty": "normal",
    "text": "Ask for feedback on a piece of work. Do it and record that you did it."
  },
  {
    "id": "c0476",
    "category": "work",
    "difficulty": "normal",
    "text": "Update your CV or portfolio. Do it and record that you did it."
  },
  {
    "id": "c0477",
    "category": "work",
    "difficulty": "normal",
    "text": "Learn one useful shortcut or skill. Do it and record that you did it."
  },
  {
    "id": "c0478",
    "category": "work",
    "difficulty": "normal",
    "text": "Prepare tomorrow's priorities before finishing today. Do it and record that you did it."
  },
  {
    "id": "c0479",
    "category": "work",
    "difficulty": "normal",
    "text": "Have a constructive conversation with a colleague. Do it and record that you did it."
  },
  {
    "id": "c0480",
    "category": "work",
    "difficulty": "normal",
    "text": "Remove one unnecessary meeting or commitment. Do it and record that you did it."
  },
  {
    "id": "c0481",
    "category": "work",
    "difficulty": "challenge",
    "text": "Volunteer for something slightly outside your comfort zone"
  },
  {
    "id": "c0482",
    "category": "work",
    "difficulty": "challenge",
    "text": "Present an idea you have been sitting on"
  },
  {
    "id": "c0483",
    "category": "work",
    "difficulty": "challenge",
    "text": "Ask your manager for meaningful feedback"
  },
  {
    "id": "c0484",
    "category": "work",
    "difficulty": "challenge",
    "text": "Have a career conversation you have been postponing"
  },
  {
    "id": "c0485",
    "category": "work",
    "difficulty": "challenge",
    "text": "Share credit publicly with someone"
  },
  {
    "id": "c0486",
    "category": "work",
    "difficulty": "challenge",
    "text": "Set a professional boundary"
  },
  {
    "id": "c0487",
    "category": "work",
    "difficulty": "challenge",
    "text": "Apply for an opportunity that intimidates you"
  },
  {
    "id": "c0488",
    "category": "work",
    "difficulty": "challenge",
    "text": "Start a project you have been waiting to feel ready for"
  },
  {
    "id": "c0489",
    "category": "work",
    "difficulty": "challenge",
    "text": "Volunteer for something slightly outside your comfort zone. Do it now."
  },
  {
    "id": "c0490",
    "category": "work",
    "difficulty": "challenge",
    "text": "Present an idea you have been sitting on. Do it now."
  },
  {
    "id": "c0491",
    "category": "work",
    "difficulty": "challenge",
    "text": "Ask your manager for meaningful feedback. Do it now."
  },
  {
    "id": "c0492",
    "category": "work",
    "difficulty": "challenge",
    "text": "Have a career conversation you have been postponing. Do it now."
  },
  {
    "id": "c0493",
    "category": "work",
    "difficulty": "challenge",
    "text": "Share credit publicly with someone. Do it now."
  },
  {
    "id": "c0494",
    "category": "work",
    "difficulty": "challenge",
    "text": "Set a professional boundary. Do it now."
  },
  {
    "id": "c0495",
    "category": "work",
    "difficulty": "challenge",
    "text": "Apply for an opportunity that intimidates you. Do it now."
  },
  {
    "id": "c0496",
    "category": "work",
    "difficulty": "challenge",
    "text": "Start a project you have been waiting to feel ready for. Do it now."
  },
  {
    "id": "c0497",
    "category": "work",
    "difficulty": "challenge",
    "text": "Volunteer for something slightly outside your comfort zone. Do it before the end of today."
  },
  {
    "id": "c0498",
    "category": "work",
    "difficulty": "challenge",
    "text": "Present an idea you have been sitting on. Do it before the end of today."
  },
  {
    "id": "c0499",
    "category": "work",
    "difficulty": "challenge",
    "text": "Ask your manager for meaningful feedback. Do it before the end of today."
  },
  {
    "id": "c0500",
    "category": "work",
    "difficulty": "challenge",
    "text": "Have a career conversation you have been postponing. Do it before the end of today."
  },
  {
    "id": "c0501",
    "category": "work",
    "difficulty": "challenge",
    "text": "Share credit publicly with someone. Do it before the end of today."
  },
  {
    "id": "c0502",
    "category": "work",
    "difficulty": "challenge",
    "text": "Set a professional boundary. Do it before the end of today."
  },
  {
    "id": "c0503",
    "category": "work",
    "difficulty": "challenge",
    "text": "Apply for an opportunity that intimidates you. Do it before the end of today."
  },
  {
    "id": "c0504",
    "category": "work",
    "difficulty": "challenge",
    "text": "Start a project you have been waiting to feel ready for. Do it before the end of today."
  },
  {
    "id": "c0505",
    "category": "work",
    "difficulty": "challenge",
    "text": "Volunteer for something slightly outside your comfort zone. Do it without overthinking."
  },
  {
    "id": "c0506",
    "category": "work",
    "difficulty": "challenge",
    "text": "Present an idea you have been sitting on. Do it without overthinking."
  },
  {
    "id": "c0507",
    "category": "work",
    "difficulty": "challenge",
    "text": "Ask your manager for meaningful feedback. Do it without overthinking."
  },
  {
    "id": "c0508",
    "category": "work",
    "difficulty": "challenge",
    "text": "Have a career conversation you have been postponing. Do it without overthinking."
  },
  {
    "id": "c0509",
    "category": "work",
    "difficulty": "challenge",
    "text": "Share credit publicly with someone. Do it without overthinking."
  },
  {
    "id": "c0510",
    "category": "work",
    "difficulty": "challenge",
    "text": "Set a professional boundary. Do it without overthinking."
  },
  {
    "id": "c0511",
    "category": "work",
    "difficulty": "challenge",
    "text": "Apply for an opportunity that intimidates you. Do it without overthinking."
  },
  {
    "id": "c0512",
    "category": "work",
    "difficulty": "challenge",
    "text": "Start a project you have been waiting to feel ready for. Do it without overthinking."
  },
  {
    "id": "c0513",
    "category": "work",
    "difficulty": "challenge",
    "text": "Volunteer for something slightly outside your comfort zone. Do it and record that you did it."
  },
  {
    "id": "c0514",
    "category": "work",
    "difficulty": "challenge",
    "text": "Present an idea you have been sitting on. Do it and record that you did it."
  },
  {
    "id": "c0515",
    "category": "work",
    "difficulty": "challenge",
    "text": "Ask your manager for meaningful feedback. Do it and record that you did it."
  },
  {
    "id": "c0516",
    "category": "work",
    "difficulty": "challenge",
    "text": "Have a career conversation you have been postponing. Do it and record that you did it."
  },
  {
    "id": "c0517",
    "category": "work",
    "difficulty": "challenge",
    "text": "Share credit publicly with someone. Do it and record that you did it."
  },
  {
    "id": "c0518",
    "category": "work",
    "difficulty": "challenge",
    "text": "Set a professional boundary. Do it and record that you did it."
  },
  {
    "id": "c0519",
    "category": "work",
    "difficulty": "challenge",
    "text": "Apply for an opportunity that intimidates you. Do it and record that you did it."
  },
  {
    "id": "c0520",
    "category": "work",
    "difficulty": "challenge",
    "text": "Start a project you have been waiting to feel ready for. Do it and record that you did it."
  },
  {
    "id": "c0521",
    "category": "work",
    "difficulty": "brutal",
    "text": "Have the career conversation you are genuinely afraid of"
  },
  {
    "id": "c0522",
    "category": "work",
    "difficulty": "brutal",
    "text": "Ask directly for the opportunity you want"
  },
  {
    "id": "c0523",
    "category": "work",
    "difficulty": "brutal",
    "text": "Address a serious workplace issue constructively"
  },
  {
    "id": "c0524",
    "category": "work",
    "difficulty": "brutal",
    "text": "Submit something ambitious for external review"
  },
  {
    "id": "c0525",
    "category": "work",
    "difficulty": "brutal",
    "text": "Spend two hours on the most important avoided task"
  },
  {
    "id": "c0526",
    "category": "work",
    "difficulty": "brutal",
    "text": "Create a concrete plan to change an unsustainable work situation"
  },
  {
    "id": "c0527",
    "category": "work",
    "difficulty": "brutal",
    "text": "Give difficult but respectful feedback"
  },
  {
    "id": "c0528",
    "category": "work",
    "difficulty": "brutal",
    "text": "Take a meaningful step toward a career change"
  },
  {
    "id": "c0529",
    "category": "work",
    "difficulty": "brutal",
    "text": "Have the career conversation you are genuinely afraid of. Do it now."
  },
  {
    "id": "c0530",
    "category": "work",
    "difficulty": "brutal",
    "text": "Ask directly for the opportunity you want. Do it now."
  },
  {
    "id": "c0531",
    "category": "work",
    "difficulty": "brutal",
    "text": "Address a serious workplace issue constructively. Do it now."
  },
  {
    "id": "c0532",
    "category": "work",
    "difficulty": "brutal",
    "text": "Submit something ambitious for external review. Do it now."
  },
  {
    "id": "c0533",
    "category": "work",
    "difficulty": "brutal",
    "text": "Spend two hours on the most important avoided task. Do it now."
  },
  {
    "id": "c0534",
    "category": "work",
    "difficulty": "brutal",
    "text": "Create a concrete plan to change an unsustainable work situation. Do it now."
  },
  {
    "id": "c0535",
    "category": "work",
    "difficulty": "brutal",
    "text": "Give difficult but respectful feedback. Do it now."
  },
  {
    "id": "c0536",
    "category": "work",
    "difficulty": "brutal",
    "text": "Take a meaningful step toward a career change. Do it now."
  },
  {
    "id": "c0537",
    "category": "work",
    "difficulty": "brutal",
    "text": "Have the career conversation you are genuinely afraid of. Do it before the end of today."
  },
  {
    "id": "c0538",
    "category": "work",
    "difficulty": "brutal",
    "text": "Ask directly for the opportunity you want. Do it before the end of today."
  },
  {
    "id": "c0539",
    "category": "work",
    "difficulty": "brutal",
    "text": "Address a serious workplace issue constructively. Do it before the end of today."
  },
  {
    "id": "c0540",
    "category": "work",
    "difficulty": "brutal",
    "text": "Submit something ambitious for external review. Do it before the end of today."
  },
  {
    "id": "c0541",
    "category": "work",
    "difficulty": "brutal",
    "text": "Spend two hours on the most important avoided task. Do it before the end of today."
  },
  {
    "id": "c0542",
    "category": "work",
    "difficulty": "brutal",
    "text": "Create a concrete plan to change an unsustainable work situation. Do it before the end of today."
  },
  {
    "id": "c0543",
    "category": "work",
    "difficulty": "brutal",
    "text": "Give difficult but respectful feedback. Do it before the end of today."
  },
  {
    "id": "c0544",
    "category": "work",
    "difficulty": "brutal",
    "text": "Take a meaningful step toward a career change. Do it before the end of today."
  },
  {
    "id": "c0545",
    "category": "work",
    "difficulty": "brutal",
    "text": "Have the career conversation you are genuinely afraid of. Do it without overthinking."
  },
  {
    "id": "c0546",
    "category": "work",
    "difficulty": "brutal",
    "text": "Ask directly for the opportunity you want. Do it without overthinking."
  },
  {
    "id": "c0547",
    "category": "work",
    "difficulty": "brutal",
    "text": "Address a serious workplace issue constructively. Do it without overthinking."
  },
  {
    "id": "c0548",
    "category": "work",
    "difficulty": "brutal",
    "text": "Submit something ambitious for external review. Do it without overthinking."
  },
  {
    "id": "c0549",
    "category": "work",
    "difficulty": "brutal",
    "text": "Spend two hours on the most important avoided task. Do it without overthinking."
  },
  {
    "id": "c0550",
    "category": "work",
    "difficulty": "brutal",
    "text": "Create a concrete plan to change an unsustainable work situation. Do it without overthinking."
  },
  {
    "id": "c0551",
    "category": "work",
    "difficulty": "brutal",
    "text": "Give difficult but respectful feedback. Do it without overthinking."
  },
  {
    "id": "c0552",
    "category": "work",
    "difficulty": "brutal",
    "text": "Take a meaningful step toward a career change. Do it without overthinking."
  },
  {
    "id": "c0553",
    "category": "work",
    "difficulty": "brutal",
    "text": "Have the career conversation you are genuinely afraid of. Do it and record that you did it."
  },
  {
    "id": "c0554",
    "category": "work",
    "difficulty": "brutal",
    "text": "Ask directly for the opportunity you want. Do it and record that you did it."
  },
  {
    "id": "c0555",
    "category": "work",
    "difficulty": "brutal",
    "text": "Address a serious workplace issue constructively. Do it and record that you did it."
  },
  {
    "id": "c0556",
    "category": "work",
    "difficulty": "brutal",
    "text": "Submit something ambitious for external review. Do it and record that you did it."
  },
  {
    "id": "c0557",
    "category": "work",
    "difficulty": "brutal",
    "text": "Spend two hours on the most important avoided task. Do it and record that you did it."
  },
  {
    "id": "c0558",
    "category": "work",
    "difficulty": "brutal",
    "text": "Create a concrete plan to change an unsustainable work situation. Do it and record that you did it."
  },
  {
    "id": "c0559",
    "category": "work",
    "difficulty": "brutal",
    "text": "Give difficult but respectful feedback. Do it and record that you did it."
  },
  {
    "id": "c0560",
    "category": "work",
    "difficulty": "brutal",
    "text": "Take a meaningful step toward a career change. Do it and record that you did it."
  },
  {
    "id": "c0561",
    "category": "work",
    "difficulty": "wild",
    "text": "Let a random timer choose your next focused task"
  },
  {
    "id": "c0562",
    "category": "work",
    "difficulty": "wild",
    "text": "Work from a completely different environment if possible"
  },
  {
    "id": "c0563",
    "category": "work",
    "difficulty": "wild",
    "text": "Ask a colleague to assign you one useful challenge"
  },
  {
    "id": "c0564",
    "category": "work",
    "difficulty": "wild",
    "text": "Spend an hour learning something unrelated to your role"
  },
  {
    "id": "c0565",
    "category": "work",
    "difficulty": "wild",
    "text": "Create and share something before you think it is perfect"
  },
  {
    "id": "c0566",
    "category": "work",
    "difficulty": "wild",
    "text": "Say yes to one unexpected learning opportunity"
  },
  {
    "id": "c0567",
    "category": "work",
    "difficulty": "wild",
    "text": "Let Fate pick one item from your backlog"
  },
  {
    "id": "c0568",
    "category": "work",
    "difficulty": "wild",
    "text": "Try a completely different productivity method for a day"
  },
  {
    "id": "c0569",
    "category": "work",
    "difficulty": "wild",
    "text": "Let a random timer choose your next focused task. Do it now."
  },
  {
    "id": "c0570",
    "category": "work",
    "difficulty": "wild",
    "text": "Work from a completely different environment if possible. Do it now."
  },
  {
    "id": "c0571",
    "category": "work",
    "difficulty": "wild",
    "text": "Ask a colleague to assign you one useful challenge. Do it now."
  },
  {
    "id": "c0572",
    "category": "work",
    "difficulty": "wild",
    "text": "Spend an hour learning something unrelated to your role. Do it now."
  },
  {
    "id": "c0573",
    "category": "work",
    "difficulty": "wild",
    "text": "Create and share something before you think it is perfect. Do it now."
  },
  {
    "id": "c0574",
    "category": "work",
    "difficulty": "wild",
    "text": "Say yes to one unexpected learning opportunity. Do it now."
  },
  {
    "id": "c0575",
    "category": "work",
    "difficulty": "wild",
    "text": "Let Fate pick one item from your backlog. Do it now."
  },
  {
    "id": "c0576",
    "category": "work",
    "difficulty": "wild",
    "text": "Try a completely different productivity method for a day. Do it now."
  },
  {
    "id": "c0577",
    "category": "work",
    "difficulty": "wild",
    "text": "Let a random timer choose your next focused task. Do it before the end of today."
  },
  {
    "id": "c0578",
    "category": "work",
    "difficulty": "wild",
    "text": "Work from a completely different environment if possible. Do it before the end of today."
  },
  {
    "id": "c0579",
    "category": "work",
    "difficulty": "wild",
    "text": "Ask a colleague to assign you one useful challenge. Do it before the end of today."
  },
  {
    "id": "c0580",
    "category": "work",
    "difficulty": "wild",
    "text": "Spend an hour learning something unrelated to your role. Do it before the end of today."
  },
  {
    "id": "c0581",
    "category": "work",
    "difficulty": "wild",
    "text": "Create and share something before you think it is perfect. Do it before the end of today."
  },
  {
    "id": "c0582",
    "category": "work",
    "difficulty": "wild",
    "text": "Say yes to one unexpected learning opportunity. Do it before the end of today."
  },
  {
    "id": "c0583",
    "category": "work",
    "difficulty": "wild",
    "text": "Let Fate pick one item from your backlog. Do it before the end of today."
  },
  {
    "id": "c0584",
    "category": "work",
    "difficulty": "wild",
    "text": "Try a completely different productivity method for a day. Do it before the end of today."
  },
  {
    "id": "c0585",
    "category": "work",
    "difficulty": "wild",
    "text": "Let a random timer choose your next focused task. Do it without overthinking."
  },
  {
    "id": "c0586",
    "category": "work",
    "difficulty": "wild",
    "text": "Work from a completely different environment if possible. Do it without overthinking."
  },
  {
    "id": "c0587",
    "category": "work",
    "difficulty": "wild",
    "text": "Ask a colleague to assign you one useful challenge. Do it without overthinking."
  },
  {
    "id": "c0588",
    "category": "work",
    "difficulty": "wild",
    "text": "Spend an hour learning something unrelated to your role. Do it without overthinking."
  },
  {
    "id": "c0589",
    "category": "work",
    "difficulty": "wild",
    "text": "Create and share something before you think it is perfect. Do it without overthinking."
  },
  {
    "id": "c0590",
    "category": "work",
    "difficulty": "wild",
    "text": "Say yes to one unexpected learning opportunity. Do it without overthinking."
  },
  {
    "id": "c0591",
    "category": "work",
    "difficulty": "wild",
    "text": "Let Fate pick one item from your backlog. Do it without overthinking."
  },
  {
    "id": "c0592",
    "category": "work",
    "difficulty": "wild",
    "text": "Try a completely different productivity method for a day. Do it without overthinking."
  },
  {
    "id": "c0593",
    "category": "work",
    "difficulty": "wild",
    "text": "Let a random timer choose your next focused task. Do it and record that you did it."
  },
  {
    "id": "c0594",
    "category": "work",
    "difficulty": "wild",
    "text": "Work from a completely different environment if possible. Do it and record that you did it."
  },
  {
    "id": "c0595",
    "category": "work",
    "difficulty": "wild",
    "text": "Ask a colleague to assign you one useful challenge. Do it and record that you did it."
  },
  {
    "id": "c0596",
    "category": "work",
    "difficulty": "wild",
    "text": "Spend an hour learning something unrelated to your role. Do it and record that you did it."
  },
  {
    "id": "c0597",
    "category": "work",
    "difficulty": "wild",
    "text": "Create and share something before you think it is perfect. Do it and record that you did it."
  },
  {
    "id": "c0598",
    "category": "work",
    "difficulty": "wild",
    "text": "Say yes to one unexpected learning opportunity. Do it and record that you did it."
  },
  {
    "id": "c0599",
    "category": "work",
    "difficulty": "wild",
    "text": "Let Fate pick one item from your backlog. Do it and record that you did it."
  },
  {
    "id": "c0600",
    "category": "work",
    "difficulty": "wild",
    "text": "Try a completely different productivity method for a day. Do it and record that you did it."
  },
  {
    "id": "c0601",
    "category": "entertainment",
    "difficulty": "easy",
    "text": "Listen to an album you have never heard"
  },
  {
    "id": "c0602",
    "category": "entertainment",
    "difficulty": "easy",
    "text": "Watch a film outside your usual genre"
  },
  {
    "id": "c0603",
    "category": "entertainment",
    "difficulty": "easy",
    "text": "Read for twenty minutes"
  },
  {
    "id": "c0604",
    "category": "entertainment",
    "difficulty": "easy",
    "text": "Play a game you have not played before"
  },
  {
    "id": "c0605",
    "category": "entertainment",
    "difficulty": "easy",
    "text": "Visit a new corner of your local area"
  },
  {
    "id": "c0606",
    "category": "entertainment",
    "difficulty": "easy",
    "text": "Try a new podcast"
  },
  {
    "id": "c0607",
    "category": "entertainment",
    "difficulty": "easy",
    "text": "Cook something purely for fun"
  },
  {
    "id": "c0608",
    "category": "entertainment",
    "difficulty": "easy",
    "text": "Make a playlist for a specific mood"
  },
  {
    "id": "c0609",
    "category": "entertainment",
    "difficulty": "easy",
    "text": "Listen to an album you have never heard. Do it now."
  },
  {
    "id": "c0610",
    "category": "entertainment",
    "difficulty": "easy",
    "text": "Watch a film outside your usual genre. Do it now."
  },
  {
    "id": "c0611",
    "category": "entertainment",
    "difficulty": "easy",
    "text": "Read for twenty minutes. Do it now."
  },
  {
    "id": "c0612",
    "category": "entertainment",
    "difficulty": "easy",
    "text": "Play a game you have not played before. Do it now."
  },
  {
    "id": "c0613",
    "category": "entertainment",
    "difficulty": "easy",
    "text": "Visit a new corner of your local area. Do it now."
  },
  {
    "id": "c0614",
    "category": "entertainment",
    "difficulty": "easy",
    "text": "Try a new podcast. Do it now."
  },
  {
    "id": "c0615",
    "category": "entertainment",
    "difficulty": "easy",
    "text": "Cook something purely for fun. Do it now."
  },
  {
    "id": "c0616",
    "category": "entertainment",
    "difficulty": "easy",
    "text": "Make a playlist for a specific mood. Do it now."
  },
  {
    "id": "c0617",
    "category": "entertainment",
    "difficulty": "easy",
    "text": "Listen to an album you have never heard. Do it before the end of today."
  },
  {
    "id": "c0618",
    "category": "entertainment",
    "difficulty": "easy",
    "text": "Watch a film outside your usual genre. Do it before the end of today."
  },
  {
    "id": "c0619",
    "category": "entertainment",
    "difficulty": "easy",
    "text": "Read for twenty minutes. Do it before the end of today."
  },
  {
    "id": "c0620",
    "category": "entertainment",
    "difficulty": "easy",
    "text": "Play a game you have not played before. Do it before the end of today."
  },
  {
    "id": "c0621",
    "category": "entertainment",
    "difficulty": "easy",
    "text": "Visit a new corner of your local area. Do it before the end of today."
  },
  {
    "id": "c0622",
    "category": "entertainment",
    "difficulty": "easy",
    "text": "Try a new podcast. Do it before the end of today."
  },
  {
    "id": "c0623",
    "category": "entertainment",
    "difficulty": "easy",
    "text": "Cook something purely for fun. Do it before the end of today."
  },
  {
    "id": "c0624",
    "category": "entertainment",
    "difficulty": "easy",
    "text": "Make a playlist for a specific mood. Do it before the end of today."
  },
  {
    "id": "c0625",
    "category": "entertainment",
    "difficulty": "easy",
    "text": "Listen to an album you have never heard. Do it without overthinking."
  },
  {
    "id": "c0626",
    "category": "entertainment",
    "difficulty": "easy",
    "text": "Watch a film outside your usual genre. Do it without overthinking."
  },
  {
    "id": "c0627",
    "category": "entertainment",
    "difficulty": "easy",
    "text": "Read for twenty minutes. Do it without overthinking."
  },
  {
    "id": "c0628",
    "category": "entertainment",
    "difficulty": "easy",
    "text": "Play a game you have not played before. Do it without overthinking."
  },
  {
    "id": "c0629",
    "category": "entertainment",
    "difficulty": "easy",
    "text": "Visit a new corner of your local area. Do it without overthinking."
  },
  {
    "id": "c0630",
    "category": "entertainment",
    "difficulty": "easy",
    "text": "Try a new podcast. Do it without overthinking."
  },
  {
    "id": "c0631",
    "category": "entertainment",
    "difficulty": "easy",
    "text": "Cook something purely for fun. Do it without overthinking."
  },
  {
    "id": "c0632",
    "category": "entertainment",
    "difficulty": "easy",
    "text": "Make a playlist for a specific mood. Do it without overthinking."
  },
  {
    "id": "c0633",
    "category": "entertainment",
    "difficulty": "easy",
    "text": "Listen to an album you have never heard. Do it and record that you did it."
  },
  {
    "id": "c0634",
    "category": "entertainment",
    "difficulty": "easy",
    "text": "Watch a film outside your usual genre. Do it and record that you did it."
  },
  {
    "id": "c0635",
    "category": "entertainment",
    "difficulty": "easy",
    "text": "Read for twenty minutes. Do it and record that you did it."
  },
  {
    "id": "c0636",
    "category": "entertainment",
    "difficulty": "easy",
    "text": "Play a game you have not played before. Do it and record that you did it."
  },
  {
    "id": "c0637",
    "category": "entertainment",
    "difficulty": "easy",
    "text": "Visit a new corner of your local area. Do it and record that you did it."
  },
  {
    "id": "c0638",
    "category": "entertainment",
    "difficulty": "easy",
    "text": "Try a new podcast. Do it and record that you did it."
  },
  {
    "id": "c0639",
    "category": "entertainment",
    "difficulty": "easy",
    "text": "Cook something purely for fun. Do it and record that you did it."
  },
  {
    "id": "c0640",
    "category": "entertainment",
    "difficulty": "easy",
    "text": "Make a playlist for a specific mood. Do it and record that you did it."
  },
  {
    "id": "c0641",
    "category": "entertainment",
    "difficulty": "normal",
    "text": "Go to a place you have never visited locally"
  },
  {
    "id": "c0642",
    "category": "entertainment",
    "difficulty": "normal",
    "text": "Attend a cultural event"
  },
  {
    "id": "c0643",
    "category": "entertainment",
    "difficulty": "normal",
    "text": "Start a creative project"
  },
  {
    "id": "c0644",
    "category": "entertainment",
    "difficulty": "normal",
    "text": "Try a hobby class or tutorial"
  },
  {
    "id": "c0645",
    "category": "entertainment",
    "difficulty": "normal",
    "text": "Spend an evening without your usual screens"
  },
  {
    "id": "c0646",
    "category": "entertainment",
    "difficulty": "normal",
    "text": "Watch a classic film you have somehow missed"
  },
  {
    "id": "c0647",
    "category": "entertainment",
    "difficulty": "normal",
    "text": "Make something with your hands"
  },
  {
    "id": "c0648",
    "category": "entertainment",
    "difficulty": "normal",
    "text": "Plan a mini adventure for the weekend"
  },
  {
    "id": "c0649",
    "category": "entertainment",
    "difficulty": "normal",
    "text": "Go to a place you have never visited locally. Do it now."
  },
  {
    "id": "c0650",
    "category": "entertainment",
    "difficulty": "normal",
    "text": "Attend a cultural event. Do it now."
  },
  {
    "id": "c0651",
    "category": "entertainment",
    "difficulty": "normal",
    "text": "Start a creative project. Do it now."
  },
  {
    "id": "c0652",
    "category": "entertainment",
    "difficulty": "normal",
    "text": "Try a hobby class or tutorial. Do it now."
  },
  {
    "id": "c0653",
    "category": "entertainment",
    "difficulty": "normal",
    "text": "Spend an evening without your usual screens. Do it now."
  },
  {
    "id": "c0654",
    "category": "entertainment",
    "difficulty": "normal",
    "text": "Watch a classic film you have somehow missed. Do it now."
  },
  {
    "id": "c0655",
    "category": "entertainment",
    "difficulty": "normal",
    "text": "Make something with your hands. Do it now."
  },
  {
    "id": "c0656",
    "category": "entertainment",
    "difficulty": "normal",
    "text": "Plan a mini adventure for the weekend. Do it now."
  },
  {
    "id": "c0657",
    "category": "entertainment",
    "difficulty": "normal",
    "text": "Go to a place you have never visited locally. Do it before the end of today."
  },
  {
    "id": "c0658",
    "category": "entertainment",
    "difficulty": "normal",
    "text": "Attend a cultural event. Do it before the end of today."
  },
  {
    "id": "c0659",
    "category": "entertainment",
    "difficulty": "normal",
    "text": "Start a creative project. Do it before the end of today."
  },
  {
    "id": "c0660",
    "category": "entertainment",
    "difficulty": "normal",
    "text": "Try a hobby class or tutorial. Do it before the end of today."
  },
  {
    "id": "c0661",
    "category": "entertainment",
    "difficulty": "normal",
    "text": "Spend an evening without your usual screens. Do it before the end of today."
  },
  {
    "id": "c0662",
    "category": "entertainment",
    "difficulty": "normal",
    "text": "Watch a classic film you have somehow missed. Do it before the end of today."
  },
  {
    "id": "c0663",
    "category": "entertainment",
    "difficulty": "normal",
    "text": "Make something with your hands. Do it before the end of today."
  },
  {
    "id": "c0664",
    "category": "entertainment",
    "difficulty": "normal",
    "text": "Plan a mini adventure for the weekend. Do it before the end of today."
  },
  {
    "id": "c0665",
    "category": "entertainment",
    "difficulty": "normal",
    "text": "Go to a place you have never visited locally. Do it without overthinking."
  },
  {
    "id": "c0666",
    "category": "entertainment",
    "difficulty": "normal",
    "text": "Attend a cultural event. Do it without overthinking."
  },
  {
    "id": "c0667",
    "category": "entertainment",
    "difficulty": "normal",
    "text": "Start a creative project. Do it without overthinking."
  },
  {
    "id": "c0668",
    "category": "entertainment",
    "difficulty": "normal",
    "text": "Try a hobby class or tutorial. Do it without overthinking."
  },
  {
    "id": "c0669",
    "category": "entertainment",
    "difficulty": "normal",
    "text": "Spend an evening without your usual screens. Do it without overthinking."
  },
  {
    "id": "c0670",
    "category": "entertainment",
    "difficulty": "normal",
    "text": "Watch a classic film you have somehow missed. Do it without overthinking."
  },
  {
    "id": "c0671",
    "category": "entertainment",
    "difficulty": "normal",
    "text": "Make something with your hands. Do it without overthinking."
  },
  {
    "id": "c0672",
    "category": "entertainment",
    "difficulty": "normal",
    "text": "Plan a mini adventure for the weekend. Do it without overthinking."
  },
  {
    "id": "c0673",
    "category": "entertainment",
    "difficulty": "normal",
    "text": "Go to a place you have never visited locally. Do it and record that you did it."
  },
  {
    "id": "c0674",
    "category": "entertainment",
    "difficulty": "normal",
    "text": "Attend a cultural event. Do it and record that you did it."
  },
  {
    "id": "c0675",
    "category": "entertainment",
    "difficulty": "normal",
    "text": "Start a creative project. Do it and record that you did it."
  },
  {
    "id": "c0676",
    "category": "entertainment",
    "difficulty": "normal",
    "text": "Try a hobby class or tutorial. Do it and record that you did it."
  },
  {
    "id": "c0677",
    "category": "entertainment",
    "difficulty": "normal",
    "text": "Spend an evening without your usual screens. Do it and record that you did it."
  },
  {
    "id": "c0678",
    "category": "entertainment",
    "difficulty": "normal",
    "text": "Watch a classic film you have somehow missed. Do it and record that you did it."
  },
  {
    "id": "c0679",
    "category": "entertainment",
    "difficulty": "normal",
    "text": "Make something with your hands. Do it and record that you did it."
  },
  {
    "id": "c0680",
    "category": "entertainment",
    "difficulty": "normal",
    "text": "Plan a mini adventure for the weekend. Do it and record that you did it."
  },
  {
    "id": "c0681",
    "category": "entertainment",
    "difficulty": "challenge",
    "text": "Go somewhere alone purely for enjoyment"
  },
  {
    "id": "c0682",
    "category": "entertainment",
    "difficulty": "challenge",
    "text": "Try a hobby you think you might be bad at"
  },
  {
    "id": "c0683",
    "category": "entertainment",
    "difficulty": "challenge",
    "text": "Attend an event where you know nobody"
  },
  {
    "id": "c0684",
    "category": "entertainment",
    "difficulty": "challenge",
    "text": "Create something and share it publicly"
  },
  {
    "id": "c0685",
    "category": "entertainment",
    "difficulty": "challenge",
    "text": "Spend a full day exploring without a rigid plan"
  },
  {
    "id": "c0686",
    "category": "entertainment",
    "difficulty": "challenge",
    "text": "Say yes to an invitation you would normally decline"
  },
  {
    "id": "c0687",
    "category": "entertainment",
    "difficulty": "challenge",
    "text": "Take a beginner lesson in something unfamiliar"
  },
  {
    "id": "c0688",
    "category": "entertainment",
    "difficulty": "challenge",
    "text": "Plan a themed evening for friends or family"
  },
  {
    "id": "c0689",
    "category": "entertainment",
    "difficulty": "challenge",
    "text": "Go somewhere alone purely for enjoyment. Do it now."
  },
  {
    "id": "c0690",
    "category": "entertainment",
    "difficulty": "challenge",
    "text": "Try a hobby you think you might be bad at. Do it now."
  },
  {
    "id": "c0691",
    "category": "entertainment",
    "difficulty": "challenge",
    "text": "Attend an event where you know nobody. Do it now."
  },
  {
    "id": "c0692",
    "category": "entertainment",
    "difficulty": "challenge",
    "text": "Create something and share it publicly. Do it now."
  },
  {
    "id": "c0693",
    "category": "entertainment",
    "difficulty": "challenge",
    "text": "Spend a full day exploring without a rigid plan. Do it now."
  },
  {
    "id": "c0694",
    "category": "entertainment",
    "difficulty": "challenge",
    "text": "Say yes to an invitation you would normally decline. Do it now."
  },
  {
    "id": "c0695",
    "category": "entertainment",
    "difficulty": "challenge",
    "text": "Take a beginner lesson in something unfamiliar. Do it now."
  },
  {
    "id": "c0696",
    "category": "entertainment",
    "difficulty": "challenge",
    "text": "Plan a themed evening for friends or family. Do it now."
  },
  {
    "id": "c0697",
    "category": "entertainment",
    "difficulty": "challenge",
    "text": "Go somewhere alone purely for enjoyment. Do it before the end of today."
  },
  {
    "id": "c0698",
    "category": "entertainment",
    "difficulty": "challenge",
    "text": "Try a hobby you think you might be bad at. Do it before the end of today."
  },
  {
    "id": "c0699",
    "category": "entertainment",
    "difficulty": "challenge",
    "text": "Attend an event where you know nobody. Do it before the end of today."
  },
  {
    "id": "c0700",
    "category": "entertainment",
    "difficulty": "challenge",
    "text": "Create something and share it publicly. Do it before the end of today."
  },
  {
    "id": "c0701",
    "category": "entertainment",
    "difficulty": "challenge",
    "text": "Spend a full day exploring without a rigid plan. Do it before the end of today."
  },
  {
    "id": "c0702",
    "category": "entertainment",
    "difficulty": "challenge",
    "text": "Say yes to an invitation you would normally decline. Do it before the end of today."
  },
  {
    "id": "c0703",
    "category": "entertainment",
    "difficulty": "challenge",
    "text": "Take a beginner lesson in something unfamiliar. Do it before the end of today."
  },
  {
    "id": "c0704",
    "category": "entertainment",
    "difficulty": "challenge",
    "text": "Plan a themed evening for friends or family. Do it before the end of today."
  },
  {
    "id": "c0705",
    "category": "entertainment",
    "difficulty": "challenge",
    "text": "Go somewhere alone purely for enjoyment. Do it without overthinking."
  },
  {
    "id": "c0706",
    "category": "entertainment",
    "difficulty": "challenge",
    "text": "Try a hobby you think you might be bad at. Do it without overthinking."
  },
  {
    "id": "c0707",
    "category": "entertainment",
    "difficulty": "challenge",
    "text": "Attend an event where you know nobody. Do it without overthinking."
  },
  {
    "id": "c0708",
    "category": "entertainment",
    "difficulty": "challenge",
    "text": "Create something and share it publicly. Do it without overthinking."
  },
  {
    "id": "c0709",
    "category": "entertainment",
    "difficulty": "challenge",
    "text": "Spend a full day exploring without a rigid plan. Do it without overthinking."
  },
  {
    "id": "c0710",
    "category": "entertainment",
    "difficulty": "challenge",
    "text": "Say yes to an invitation you would normally decline. Do it without overthinking."
  },
  {
    "id": "c0711",
    "category": "entertainment",
    "difficulty": "challenge",
    "text": "Take a beginner lesson in something unfamiliar. Do it without overthinking."
  },
  {
    "id": "c0712",
    "category": "entertainment",
    "difficulty": "challenge",
    "text": "Plan a themed evening for friends or family. Do it without overthinking."
  },
  {
    "id": "c0713",
    "category": "entertainment",
    "difficulty": "challenge",
    "text": "Go somewhere alone purely for enjoyment. Do it and record that you did it."
  },
  {
    "id": "c0714",
    "category": "entertainment",
    "difficulty": "challenge",
    "text": "Try a hobby you think you might be bad at. Do it and record that you did it."
  },
  {
    "id": "c0715",
    "category": "entertainment",
    "difficulty": "challenge",
    "text": "Attend an event where you know nobody. Do it and record that you did it."
  },
  {
    "id": "c0716",
    "category": "entertainment",
    "difficulty": "challenge",
    "text": "Create something and share it publicly. Do it and record that you did it."
  },
  {
    "id": "c0717",
    "category": "entertainment",
    "difficulty": "challenge",
    "text": "Spend a full day exploring without a rigid plan. Do it and record that you did it."
  },
  {
    "id": "c0718",
    "category": "entertainment",
    "difficulty": "challenge",
    "text": "Say yes to an invitation you would normally decline. Do it and record that you did it."
  },
  {
    "id": "c0719",
    "category": "entertainment",
    "difficulty": "challenge",
    "text": "Take a beginner lesson in something unfamiliar. Do it and record that you did it."
  },
  {
    "id": "c0720",
    "category": "entertainment",
    "difficulty": "challenge",
    "text": "Plan a themed evening for friends or family. Do it and record that you did it."
  },
  {
    "id": "c0721",
    "category": "entertainment",
    "difficulty": "brutal",
    "text": "Perform or participate rather than spectate"
  },
  {
    "id": "c0722",
    "category": "entertainment",
    "difficulty": "brutal",
    "text": "Take a full day away from your normal entertainment habits"
  },
  {
    "id": "c0723",
    "category": "entertainment",
    "difficulty": "brutal",
    "text": "Book an experience that genuinely pushes your comfort zone"
  },
  {
    "id": "c0724",
    "category": "entertainment",
    "difficulty": "brutal",
    "text": "Create something ambitious and finish it"
  },
  {
    "id": "c0725",
    "category": "entertainment",
    "difficulty": "brutal",
    "text": "Go on a solo adventure"
  },
  {
    "id": "c0726",
    "category": "entertainment",
    "difficulty": "brutal",
    "text": "Attend a social event without relying on your usual companion"
  },
  {
    "id": "c0727",
    "category": "entertainment",
    "difficulty": "brutal",
    "text": "Spend a weekend trying a completely new hobby"
  },
  {
    "id": "c0728",
    "category": "entertainment",
    "difficulty": "brutal",
    "text": "Commit to a creative challenge with a deadline"
  },
  {
    "id": "c0729",
    "category": "entertainment",
    "difficulty": "brutal",
    "text": "Perform or participate rather than spectate. Do it now."
  },
  {
    "id": "c0730",
    "category": "entertainment",
    "difficulty": "brutal",
    "text": "Take a full day away from your normal entertainment habits. Do it now."
  },
  {
    "id": "c0731",
    "category": "entertainment",
    "difficulty": "brutal",
    "text": "Book an experience that genuinely pushes your comfort zone. Do it now."
  },
  {
    "id": "c0732",
    "category": "entertainment",
    "difficulty": "brutal",
    "text": "Create something ambitious and finish it. Do it now."
  },
  {
    "id": "c0733",
    "category": "entertainment",
    "difficulty": "brutal",
    "text": "Go on a solo adventure. Do it now."
  },
  {
    "id": "c0734",
    "category": "entertainment",
    "difficulty": "brutal",
    "text": "Attend a social event without relying on your usual companion. Do it now."
  },
  {
    "id": "c0735",
    "category": "entertainment",
    "difficulty": "brutal",
    "text": "Spend a weekend trying a completely new hobby. Do it now."
  },
  {
    "id": "c0736",
    "category": "entertainment",
    "difficulty": "brutal",
    "text": "Commit to a creative challenge with a deadline. Do it now."
  },
  {
    "id": "c0737",
    "category": "entertainment",
    "difficulty": "brutal",
    "text": "Perform or participate rather than spectate. Do it before the end of today."
  },
  {
    "id": "c0738",
    "category": "entertainment",
    "difficulty": "brutal",
    "text": "Take a full day away from your normal entertainment habits. Do it before the end of today."
  },
  {
    "id": "c0739",
    "category": "entertainment",
    "difficulty": "brutal",
    "text": "Book an experience that genuinely pushes your comfort zone. Do it before the end of today."
  },
  {
    "id": "c0740",
    "category": "entertainment",
    "difficulty": "brutal",
    "text": "Create something ambitious and finish it. Do it before the end of today."
  },
  {
    "id": "c0741",
    "category": "entertainment",
    "difficulty": "brutal",
    "text": "Go on a solo adventure. Do it before the end of today."
  },
  {
    "id": "c0742",
    "category": "entertainment",
    "difficulty": "brutal",
    "text": "Attend a social event without relying on your usual companion. Do it before the end of today."
  },
  {
    "id": "c0743",
    "category": "entertainment",
    "difficulty": "brutal",
    "text": "Spend a weekend trying a completely new hobby. Do it before the end of today."
  },
  {
    "id": "c0744",
    "category": "entertainment",
    "difficulty": "brutal",
    "text": "Commit to a creative challenge with a deadline. Do it before the end of today."
  },
  {
    "id": "c0745",
    "category": "entertainment",
    "difficulty": "brutal",
    "text": "Perform or participate rather than spectate. Do it without overthinking."
  },
  {
    "id": "c0746",
    "category": "entertainment",
    "difficulty": "brutal",
    "text": "Take a full day away from your normal entertainment habits. Do it without overthinking."
  },
  {
    "id": "c0747",
    "category": "entertainment",
    "difficulty": "brutal",
    "text": "Book an experience that genuinely pushes your comfort zone. Do it without overthinking."
  },
  {
    "id": "c0748",
    "category": "entertainment",
    "difficulty": "brutal",
    "text": "Create something ambitious and finish it. Do it without overthinking."
  },
  {
    "id": "c0749",
    "category": "entertainment",
    "difficulty": "brutal",
    "text": "Go on a solo adventure. Do it without overthinking."
  },
  {
    "id": "c0750",
    "category": "entertainment",
    "difficulty": "brutal",
    "text": "Attend a social event without relying on your usual companion. Do it without overthinking."
  },
  {
    "id": "c0751",
    "category": "entertainment",
    "difficulty": "brutal",
    "text": "Spend a weekend trying a completely new hobby. Do it without overthinking."
  },
  {
    "id": "c0752",
    "category": "entertainment",
    "difficulty": "brutal",
    "text": "Commit to a creative challenge with a deadline. Do it without overthinking."
  },
  {
    "id": "c0753",
    "category": "entertainment",
    "difficulty": "brutal",
    "text": "Perform or participate rather than spectate. Do it and record that you did it."
  },
  {
    "id": "c0754",
    "category": "entertainment",
    "difficulty": "brutal",
    "text": "Take a full day away from your normal entertainment habits. Do it and record that you did it."
  },
  {
    "id": "c0755",
    "category": "entertainment",
    "difficulty": "brutal",
    "text": "Book an experience that genuinely pushes your comfort zone. Do it and record that you did it."
  },
  {
    "id": "c0756",
    "category": "entertainment",
    "difficulty": "brutal",
    "text": "Create something ambitious and finish it. Do it and record that you did it."
  },
  {
    "id": "c0757",
    "category": "entertainment",
    "difficulty": "brutal",
    "text": "Go on a solo adventure. Do it and record that you did it."
  },
  {
    "id": "c0758",
    "category": "entertainment",
    "difficulty": "brutal",
    "text": "Attend a social event without relying on your usual companion. Do it and record that you did it."
  },
  {
    "id": "c0759",
    "category": "entertainment",
    "difficulty": "brutal",
    "text": "Spend a weekend trying a completely new hobby. Do it and record that you did it."
  },
  {
    "id": "c0760",
    "category": "entertainment",
    "difficulty": "brutal",
    "text": "Commit to a creative challenge with a deadline. Do it and record that you did it."
  },
  {
    "id": "c0761",
    "category": "entertainment",
    "difficulty": "wild",
    "text": "Let a random number choose a film genre"
  },
  {
    "id": "c0762",
    "category": "entertainment",
    "difficulty": "wild",
    "text": "Let a friend choose your entertainment for an evening"
  },
  {
    "id": "c0763",
    "category": "entertainment",
    "difficulty": "wild",
    "text": "Go somewhere using the first interesting idea you see"
  },
  {
    "id": "c0764",
    "category": "entertainment",
    "difficulty": "wild",
    "text": "Build an adventure from three random words"
  },
  {
    "id": "c0765",
    "category": "entertainment",
    "difficulty": "wild",
    "text": "Spend an evening following only spontaneous plans"
  },
  {
    "id": "c0766",
    "category": "entertainment",
    "difficulty": "wild",
    "text": "Try the least likely activity on your local events list"
  },
  {
    "id": "c0767",
    "category": "entertainment",
    "difficulty": "wild",
    "text": "Create a mystery itinerary for yourself"
  },
  {
    "id": "c0768",
    "category": "entertainment",
    "difficulty": "wild",
    "text": "Swap entertainment recommendations with someone completely different from you"
  },
  {
    "id": "c0769",
    "category": "entertainment",
    "difficulty": "wild",
    "text": "Let a random number choose a film genre. Do it now."
  },
  {
    "id": "c0770",
    "category": "entertainment",
    "difficulty": "wild",
    "text": "Let a friend choose your entertainment for an evening. Do it now."
  },
  {
    "id": "c0771",
    "category": "entertainment",
    "difficulty": "wild",
    "text": "Go somewhere using the first interesting idea you see. Do it now."
  },
  {
    "id": "c0772",
    "category": "entertainment",
    "difficulty": "wild",
    "text": "Build an adventure from three random words. Do it now."
  },
  {
    "id": "c0773",
    "category": "entertainment",
    "difficulty": "wild",
    "text": "Spend an evening following only spontaneous plans. Do it now."
  },
  {
    "id": "c0774",
    "category": "entertainment",
    "difficulty": "wild",
    "text": "Try the least likely activity on your local events list. Do it now."
  },
  {
    "id": "c0775",
    "category": "entertainment",
    "difficulty": "wild",
    "text": "Create a mystery itinerary for yourself. Do it now."
  },
  {
    "id": "c0776",
    "category": "entertainment",
    "difficulty": "wild",
    "text": "Swap entertainment recommendations with someone completely different from you. Do it now."
  },
  {
    "id": "c0777",
    "category": "entertainment",
    "difficulty": "wild",
    "text": "Let a random number choose a film genre. Do it before the end of today."
  },
  {
    "id": "c0778",
    "category": "entertainment",
    "difficulty": "wild",
    "text": "Let a friend choose your entertainment for an evening. Do it before the end of today."
  },
  {
    "id": "c0779",
    "category": "entertainment",
    "difficulty": "wild",
    "text": "Go somewhere using the first interesting idea you see. Do it before the end of today."
  },
  {
    "id": "c0780",
    "category": "entertainment",
    "difficulty": "wild",
    "text": "Build an adventure from three random words. Do it before the end of today."
  },
  {
    "id": "c0781",
    "category": "entertainment",
    "difficulty": "wild",
    "text": "Spend an evening following only spontaneous plans. Do it before the end of today."
  },
  {
    "id": "c0782",
    "category": "entertainment",
    "difficulty": "wild",
    "text": "Try the least likely activity on your local events list. Do it before the end of today."
  },
  {
    "id": "c0783",
    "category": "entertainment",
    "difficulty": "wild",
    "text": "Create a mystery itinerary for yourself. Do it before the end of today."
  },
  {
    "id": "c0784",
    "category": "entertainment",
    "difficulty": "wild",
    "text": "Swap entertainment recommendations with someone completely different from you. Do it before the end of today."
  },
  {
    "id": "c0785",
    "category": "entertainment",
    "difficulty": "wild",
    "text": "Let a random number choose a film genre. Do it without overthinking."
  },
  {
    "id": "c0786",
    "category": "entertainment",
    "difficulty": "wild",
    "text": "Let a friend choose your entertainment for an evening. Do it without overthinking."
  },
  {
    "id": "c0787",
    "category": "entertainment",
    "difficulty": "wild",
    "text": "Go somewhere using the first interesting idea you see. Do it without overthinking."
  },
  {
    "id": "c0788",
    "category": "entertainment",
    "difficulty": "wild",
    "text": "Build an adventure from three random words. Do it without overthinking."
  },
  {
    "id": "c0789",
    "category": "entertainment",
    "difficulty": "wild",
    "text": "Spend an evening following only spontaneous plans. Do it without overthinking."
  },
  {
    "id": "c0790",
    "category": "entertainment",
    "difficulty": "wild",
    "text": "Try the least likely activity on your local events list. Do it without overthinking."
  },
  {
    "id": "c0791",
    "category": "entertainment",
    "difficulty": "wild",
    "text": "Create a mystery itinerary for yourself. Do it without overthinking."
  },
  {
    "id": "c0792",
    "category": "entertainment",
    "difficulty": "wild",
    "text": "Swap entertainment recommendations with someone completely different from you. Do it without overthinking."
  },
  {
    "id": "c0793",
    "category": "entertainment",
    "difficulty": "wild",
    "text": "Let a random number choose a film genre. Do it and record that you did it."
  },
  {
    "id": "c0794",
    "category": "entertainment",
    "difficulty": "wild",
    "text": "Let a friend choose your entertainment for an evening. Do it and record that you did it."
  },
  {
    "id": "c0795",
    "category": "entertainment",
    "difficulty": "wild",
    "text": "Go somewhere using the first interesting idea you see. Do it and record that you did it."
  },
  {
    "id": "c0796",
    "category": "entertainment",
    "difficulty": "wild",
    "text": "Build an adventure from three random words. Do it and record that you did it."
  },
  {
    "id": "c0797",
    "category": "entertainment",
    "difficulty": "wild",
    "text": "Spend an evening following only spontaneous plans. Do it and record that you did it."
  },
  {
    "id": "c0798",
    "category": "entertainment",
    "difficulty": "wild",
    "text": "Try the least likely activity on your local events list. Do it and record that you did it."
  },
  {
    "id": "c0799",
    "category": "entertainment",
    "difficulty": "wild",
    "text": "Create a mystery itinerary for yourself. Do it and record that you did it."
  },
  {
    "id": "c0800",
    "category": "entertainment",
    "difficulty": "wild",
    "text": "Swap entertainment recommendations with someone completely different from you. Do it and record that you did it."
  },
  {
    "id": "c0801",
    "category": "life-admin",
    "difficulty": "easy",
    "text": "Reply to one important message"
  },
  {
    "id": "c0802",
    "category": "life-admin",
    "difficulty": "easy",
    "text": "Book one appointment you have delayed"
  },
  {
    "id": "c0803",
    "category": "life-admin",
    "difficulty": "easy",
    "text": "File ten loose documents"
  },
  {
    "id": "c0804",
    "category": "life-admin",
    "difficulty": "easy",
    "text": "Update one password"
  },
  {
    "id": "c0805",
    "category": "life-admin",
    "difficulty": "easy",
    "text": "Clear one small digital clutter area"
  },
  {
    "id": "c0806",
    "category": "life-admin",
    "difficulty": "easy",
    "text": "Put one important date in your calendar"
  },
  {
    "id": "c0807",
    "category": "life-admin",
    "difficulty": "easy",
    "text": "Deal with one unopened letter"
  },
  {
    "id": "c0808",
    "category": "life-admin",
    "difficulty": "easy",
    "text": "Make one phone call you have been avoiding"
  },
  {
    "id": "c0809",
    "category": "life-admin",
    "difficulty": "easy",
    "text": "Reply to one important message. Do it now."
  },
  {
    "id": "c0810",
    "category": "life-admin",
    "difficulty": "easy",
    "text": "Book one appointment you have delayed. Do it now."
  },
  {
    "id": "c0811",
    "category": "life-admin",
    "difficulty": "easy",
    "text": "File ten loose documents. Do it now."
  },
  {
    "id": "c0812",
    "category": "life-admin",
    "difficulty": "easy",
    "text": "Update one password. Do it now."
  },
  {
    "id": "c0813",
    "category": "life-admin",
    "difficulty": "easy",
    "text": "Clear one small digital clutter area. Do it now."
  },
  {
    "id": "c0814",
    "category": "life-admin",
    "difficulty": "easy",
    "text": "Put one important date in your calendar. Do it now."
  },
  {
    "id": "c0815",
    "category": "life-admin",
    "difficulty": "easy",
    "text": "Deal with one unopened letter. Do it now."
  },
  {
    "id": "c0816",
    "category": "life-admin",
    "difficulty": "easy",
    "text": "Make one phone call you have been avoiding. Do it now."
  },
  {
    "id": "c0817",
    "category": "life-admin",
    "difficulty": "easy",
    "text": "Reply to one important message. Do it before the end of today."
  },
  {
    "id": "c0818",
    "category": "life-admin",
    "difficulty": "easy",
    "text": "Book one appointment you have delayed. Do it before the end of today."
  },
  {
    "id": "c0819",
    "category": "life-admin",
    "difficulty": "easy",
    "text": "File ten loose documents. Do it before the end of today."
  },
  {
    "id": "c0820",
    "category": "life-admin",
    "difficulty": "easy",
    "text": "Update one password. Do it before the end of today."
  },
  {
    "id": "c0821",
    "category": "life-admin",
    "difficulty": "easy",
    "text": "Clear one small digital clutter area. Do it before the end of today."
  },
  {
    "id": "c0822",
    "category": "life-admin",
    "difficulty": "easy",
    "text": "Put one important date in your calendar. Do it before the end of today."
  },
  {
    "id": "c0823",
    "category": "life-admin",
    "difficulty": "easy",
    "text": "Deal with one unopened letter. Do it before the end of today."
  },
  {
    "id": "c0824",
    "category": "life-admin",
    "difficulty": "easy",
    "text": "Make one phone call you have been avoiding. Do it before the end of today."
  },
  {
    "id": "c0825",
    "category": "life-admin",
    "difficulty": "easy",
    "text": "Reply to one important message. Do it without overthinking."
  },
  {
    "id": "c0826",
    "category": "life-admin",
    "difficulty": "easy",
    "text": "Book one appointment you have delayed. Do it without overthinking."
  },
  {
    "id": "c0827",
    "category": "life-admin",
    "difficulty": "easy",
    "text": "File ten loose documents. Do it without overthinking."
  },
  {
    "id": "c0828",
    "category": "life-admin",
    "difficulty": "easy",
    "text": "Update one password. Do it without overthinking."
  },
  {
    "id": "c0829",
    "category": "life-admin",
    "difficulty": "easy",
    "text": "Clear one small digital clutter area. Do it without overthinking."
  },
  {
    "id": "c0830",
    "category": "life-admin",
    "difficulty": "easy",
    "text": "Put one important date in your calendar. Do it without overthinking."
  },
  {
    "id": "c0831",
    "category": "life-admin",
    "difficulty": "easy",
    "text": "Deal with one unopened letter. Do it without overthinking."
  },
  {
    "id": "c0832",
    "category": "life-admin",
    "difficulty": "easy",
    "text": "Make one phone call you have been avoiding. Do it without overthinking."
  },
  {
    "id": "c0833",
    "category": "life-admin",
    "difficulty": "easy",
    "text": "Reply to one important message. Do it and record that you did it."
  },
  {
    "id": "c0834",
    "category": "life-admin",
    "difficulty": "easy",
    "text": "Book one appointment you have delayed. Do it and record that you did it."
  },
  {
    "id": "c0835",
    "category": "life-admin",
    "difficulty": "easy",
    "text": "File ten loose documents. Do it and record that you did it."
  },
  {
    "id": "c0836",
    "category": "life-admin",
    "difficulty": "easy",
    "text": "Update one password. Do it and record that you did it."
  },
  {
    "id": "c0837",
    "category": "life-admin",
    "difficulty": "easy",
    "text": "Clear one small digital clutter area. Do it and record that you did it."
  },
  {
    "id": "c0838",
    "category": "life-admin",
    "difficulty": "easy",
    "text": "Put one important date in your calendar. Do it and record that you did it."
  },
  {
    "id": "c0839",
    "category": "life-admin",
    "difficulty": "easy",
    "text": "Deal with one unopened letter. Do it and record that you did it."
  },
  {
    "id": "c0840",
    "category": "life-admin",
    "difficulty": "easy",
    "text": "Make one phone call you have been avoiding. Do it and record that you did it."
  },
  {
    "id": "c0841",
    "category": "life-admin",
    "difficulty": "normal",
    "text": "Complete a one-hour life admin sprint"
  },
  {
    "id": "c0842",
    "category": "life-admin",
    "difficulty": "normal",
    "text": "Organise your important documents"
  },
  {
    "id": "c0843",
    "category": "life-admin",
    "difficulty": "normal",
    "text": "Review upcoming appointments and deadlines"
  },
  {
    "id": "c0844",
    "category": "life-admin",
    "difficulty": "normal",
    "text": "Create a simple weekly household plan"
  },
  {
    "id": "c0845",
    "category": "life-admin",
    "difficulty": "normal",
    "text": "Clear your email backlog for thirty minutes"
  },
  {
    "id": "c0846",
    "category": "life-admin",
    "difficulty": "normal",
    "text": "Update your emergency contacts"
  },
  {
    "id": "c0847",
    "category": "life-admin",
    "difficulty": "normal",
    "text": "Create a list of recurring tasks"
  },
  {
    "id": "c0848",
    "category": "life-admin",
    "difficulty": "normal",
    "text": "Tackle one administrative task you have avoided for over a month"
  },
  {
    "id": "c0849",
    "category": "life-admin",
    "difficulty": "normal",
    "text": "Complete a one-hour life admin sprint. Do it now."
  },
  {
    "id": "c0850",
    "category": "life-admin",
    "difficulty": "normal",
    "text": "Organise your important documents. Do it now."
  },
  {
    "id": "c0851",
    "category": "life-admin",
    "difficulty": "normal",
    "text": "Review upcoming appointments and deadlines. Do it now."
  },
  {
    "id": "c0852",
    "category": "life-admin",
    "difficulty": "normal",
    "text": "Create a simple weekly household plan. Do it now."
  },
  {
    "id": "c0853",
    "category": "life-admin",
    "difficulty": "normal",
    "text": "Clear your email backlog for thirty minutes. Do it now."
  },
  {
    "id": "c0854",
    "category": "life-admin",
    "difficulty": "normal",
    "text": "Update your emergency contacts. Do it now."
  },
  {
    "id": "c0855",
    "category": "life-admin",
    "difficulty": "normal",
    "text": "Create a list of recurring tasks. Do it now."
  },
  {
    "id": "c0856",
    "category": "life-admin",
    "difficulty": "normal",
    "text": "Tackle one administrative task you have avoided for over a month. Do it now."
  },
  {
    "id": "c0857",
    "category": "life-admin",
    "difficulty": "normal",
    "text": "Complete a one-hour life admin sprint. Do it before the end of today."
  },
  {
    "id": "c0858",
    "category": "life-admin",
    "difficulty": "normal",
    "text": "Organise your important documents. Do it before the end of today."
  },
  {
    "id": "c0859",
    "category": "life-admin",
    "difficulty": "normal",
    "text": "Review upcoming appointments and deadlines. Do it before the end of today."
  },
  {
    "id": "c0860",
    "category": "life-admin",
    "difficulty": "normal",
    "text": "Create a simple weekly household plan. Do it before the end of today."
  },
  {
    "id": "c0861",
    "category": "life-admin",
    "difficulty": "normal",
    "text": "Clear your email backlog for thirty minutes. Do it before the end of today."
  },
  {
    "id": "c0862",
    "category": "life-admin",
    "difficulty": "normal",
    "text": "Update your emergency contacts. Do it before the end of today."
  },
  {
    "id": "c0863",
    "category": "life-admin",
    "difficulty": "normal",
    "text": "Create a list of recurring tasks. Do it before the end of today."
  },
  {
    "id": "c0864",
    "category": "life-admin",
    "difficulty": "normal",
    "text": "Tackle one administrative task you have avoided for over a month. Do it before the end of today."
  },
  {
    "id": "c0865",
    "category": "life-admin",
    "difficulty": "normal",
    "text": "Complete a one-hour life admin sprint. Do it without overthinking."
  },
  {
    "id": "c0866",
    "category": "life-admin",
    "difficulty": "normal",
    "text": "Organise your important documents. Do it without overthinking."
  },
  {
    "id": "c0867",
    "category": "life-admin",
    "difficulty": "normal",
    "text": "Review upcoming appointments and deadlines. Do it without overthinking."
  },
  {
    "id": "c0868",
    "category": "life-admin",
    "difficulty": "normal",
    "text": "Create a simple weekly household plan. Do it without overthinking."
  },
  {
    "id": "c0869",
    "category": "life-admin",
    "difficulty": "normal",
    "text": "Clear your email backlog for thirty minutes. Do it without overthinking."
  },
  {
    "id": "c0870",
    "category": "life-admin",
    "difficulty": "normal",
    "text": "Update your emergency contacts. Do it without overthinking."
  },
  {
    "id": "c0871",
    "category": "life-admin",
    "difficulty": "normal",
    "text": "Create a list of recurring tasks. Do it without overthinking."
  },
  {
    "id": "c0872",
    "category": "life-admin",
    "difficulty": "normal",
    "text": "Tackle one administrative task you have avoided for over a month. Do it without overthinking."
  },
  {
    "id": "c0873",
    "category": "life-admin",
    "difficulty": "normal",
    "text": "Complete a one-hour life admin sprint. Do it and record that you did it."
  },
  {
    "id": "c0874",
    "category": "life-admin",
    "difficulty": "normal",
    "text": "Organise your important documents. Do it and record that you did it."
  },
  {
    "id": "c0875",
    "category": "life-admin",
    "difficulty": "normal",
    "text": "Review upcoming appointments and deadlines. Do it and record that you did it."
  },
  {
    "id": "c0876",
    "category": "life-admin",
    "difficulty": "normal",
    "text": "Create a simple weekly household plan. Do it and record that you did it."
  },
  {
    "id": "c0877",
    "category": "life-admin",
    "difficulty": "normal",
    "text": "Clear your email backlog for thirty minutes. Do it and record that you did it."
  },
  {
    "id": "c0878",
    "category": "life-admin",
    "difficulty": "normal",
    "text": "Update your emergency contacts. Do it and record that you did it."
  },
  {
    "id": "c0879",
    "category": "life-admin",
    "difficulty": "normal",
    "text": "Create a list of recurring tasks. Do it and record that you did it."
  },
  {
    "id": "c0880",
    "category": "life-admin",
    "difficulty": "normal",
    "text": "Tackle one administrative task you have avoided for over a month. Do it and record that you did it."
  },
  {
    "id": "c0881",
    "category": "life-admin",
    "difficulty": "challenge",
    "text": "Complete the most annoying task on your to-do list"
  },
  {
    "id": "c0882",
    "category": "life-admin",
    "difficulty": "challenge",
    "text": "Sort out a complicated form or application"
  },
  {
    "id": "c0883",
    "category": "life-admin",
    "difficulty": "challenge",
    "text": "Create a system for something that repeatedly becomes chaotic"
  },
  {
    "id": "c0884",
    "category": "life-admin",
    "difficulty": "challenge",
    "text": "Spend two hours clearing accumulated admin"
  },
  {
    "id": "c0885",
    "category": "life-admin",
    "difficulty": "challenge",
    "text": "Resolve an outstanding issue with a company or provider"
  },
  {
    "id": "c0886",
    "category": "life-admin",
    "difficulty": "challenge",
    "text": "Review all your important renewals"
  },
  {
    "id": "c0887",
    "category": "life-admin",
    "difficulty": "challenge",
    "text": "Create a personal document backup system"
  },
  {
    "id": "c0888",
    "category": "life-admin",
    "difficulty": "challenge",
    "text": "Finish three delayed tasks before starting anything new"
  },
  {
    "id": "c0889",
    "category": "life-admin",
    "difficulty": "challenge",
    "text": "Complete the most annoying task on your to-do list. Do it now."
  },
  {
    "id": "c0890",
    "category": "life-admin",
    "difficulty": "challenge",
    "text": "Sort out a complicated form or application. Do it now."
  },
  {
    "id": "c0891",
    "category": "life-admin",
    "difficulty": "challenge",
    "text": "Create a system for something that repeatedly becomes chaotic. Do it now."
  },
  {
    "id": "c0892",
    "category": "life-admin",
    "difficulty": "challenge",
    "text": "Spend two hours clearing accumulated admin. Do it now."
  },
  {
    "id": "c0893",
    "category": "life-admin",
    "difficulty": "challenge",
    "text": "Resolve an outstanding issue with a company or provider. Do it now."
  },
  {
    "id": "c0894",
    "category": "life-admin",
    "difficulty": "challenge",
    "text": "Review all your important renewals. Do it now."
  },
  {
    "id": "c0895",
    "category": "life-admin",
    "difficulty": "challenge",
    "text": "Create a personal document backup system. Do it now."
  },
  {
    "id": "c0896",
    "category": "life-admin",
    "difficulty": "challenge",
    "text": "Finish three delayed tasks before starting anything new. Do it now."
  },
  {
    "id": "c0897",
    "category": "life-admin",
    "difficulty": "challenge",
    "text": "Complete the most annoying task on your to-do list. Do it before the end of today."
  },
  {
    "id": "c0898",
    "category": "life-admin",
    "difficulty": "challenge",
    "text": "Sort out a complicated form or application. Do it before the end of today."
  },
  {
    "id": "c0899",
    "category": "life-admin",
    "difficulty": "challenge",
    "text": "Create a system for something that repeatedly becomes chaotic. Do it before the end of today."
  },
  {
    "id": "c0900",
    "category": "life-admin",
    "difficulty": "challenge",
    "text": "Spend two hours clearing accumulated admin. Do it before the end of today."
  },
  {
    "id": "c0901",
    "category": "life-admin",
    "difficulty": "challenge",
    "text": "Resolve an outstanding issue with a company or provider. Do it before the end of today."
  },
  {
    "id": "c0902",
    "category": "life-admin",
    "difficulty": "challenge",
    "text": "Review all your important renewals. Do it before the end of today."
  },
  {
    "id": "c0903",
    "category": "life-admin",
    "difficulty": "challenge",
    "text": "Create a personal document backup system. Do it before the end of today."
  },
  {
    "id": "c0904",
    "category": "life-admin",
    "difficulty": "challenge",
    "text": "Finish three delayed tasks before starting anything new. Do it before the end of today."
  },
  {
    "id": "c0905",
    "category": "life-admin",
    "difficulty": "challenge",
    "text": "Complete the most annoying task on your to-do list. Do it without overthinking."
  },
  {
    "id": "c0906",
    "category": "life-admin",
    "difficulty": "challenge",
    "text": "Sort out a complicated form or application. Do it without overthinking."
  },
  {
    "id": "c0907",
    "category": "life-admin",
    "difficulty": "challenge",
    "text": "Create a system for something that repeatedly becomes chaotic. Do it without overthinking."
  },
  {
    "id": "c0908",
    "category": "life-admin",
    "difficulty": "challenge",
    "text": "Spend two hours clearing accumulated admin. Do it without overthinking."
  },
  {
    "id": "c0909",
    "category": "life-admin",
    "difficulty": "challenge",
    "text": "Resolve an outstanding issue with a company or provider. Do it without overthinking."
  },
  {
    "id": "c0910",
    "category": "life-admin",
    "difficulty": "challenge",
    "text": "Review all your important renewals. Do it without overthinking."
  },
  {
    "id": "c0911",
    "category": "life-admin",
    "difficulty": "challenge",
    "text": "Create a personal document backup system. Do it without overthinking."
  },
  {
    "id": "c0912",
    "category": "life-admin",
    "difficulty": "challenge",
    "text": "Finish three delayed tasks before starting anything new. Do it without overthinking."
  },
  {
    "id": "c0913",
    "category": "life-admin",
    "difficulty": "challenge",
    "text": "Complete the most annoying task on your to-do list. Do it and record that you did it."
  },
  {
    "id": "c0914",
    "category": "life-admin",
    "difficulty": "challenge",
    "text": "Sort out a complicated form or application. Do it and record that you did it."
  },
  {
    "id": "c0915",
    "category": "life-admin",
    "difficulty": "challenge",
    "text": "Create a system for something that repeatedly becomes chaotic. Do it and record that you did it."
  },
  {
    "id": "c0916",
    "category": "life-admin",
    "difficulty": "challenge",
    "text": "Spend two hours clearing accumulated admin. Do it and record that you did it."
  },
  {
    "id": "c0917",
    "category": "life-admin",
    "difficulty": "challenge",
    "text": "Resolve an outstanding issue with a company or provider. Do it and record that you did it."
  },
  {
    "id": "c0918",
    "category": "life-admin",
    "difficulty": "challenge",
    "text": "Review all your important renewals. Do it and record that you did it."
  },
  {
    "id": "c0919",
    "category": "life-admin",
    "difficulty": "challenge",
    "text": "Create a personal document backup system. Do it and record that you did it."
  },
  {
    "id": "c0920",
    "category": "life-admin",
    "difficulty": "challenge",
    "text": "Finish three delayed tasks before starting anything new. Do it and record that you did it."
  },
  {
    "id": "c0921",
    "category": "life-admin",
    "difficulty": "brutal",
    "text": "Complete a full life-admin audit"
  },
  {
    "id": "c0922",
    "category": "life-admin",
    "difficulty": "brutal",
    "text": "Spend half a day clearing long-standing bureaucracy"
  },
  {
    "id": "c0923",
    "category": "life-admin",
    "difficulty": "brutal",
    "text": "Resolve the administrative problem causing you the most stress"
  },
  {
    "id": "c0924",
    "category": "life-admin",
    "difficulty": "brutal",
    "text": "Create a complete household operations system"
  },
  {
    "id": "c0925",
    "category": "life-admin",
    "difficulty": "brutal",
    "text": "Tackle every overdue form or document you can reasonably finish"
  },
  {
    "id": "c0926",
    "category": "life-admin",
    "difficulty": "brutal",
    "text": "Make all the calls you have been putting off"
  },
  {
    "id": "c0927",
    "category": "life-admin",
    "difficulty": "brutal",
    "text": "Close out an unresolved account or service issue"
  },
  {
    "id": "c0928",
    "category": "life-admin",
    "difficulty": "brutal",
    "text": "Create a maintenance plan for the next three months"
  },
  {
    "id": "c0929",
    "category": "life-admin",
    "difficulty": "brutal",
    "text": "Complete a full life-admin audit. Do it now."
  },
  {
    "id": "c0930",
    "category": "life-admin",
    "difficulty": "brutal",
    "text": "Spend half a day clearing long-standing bureaucracy. Do it now."
  },
  {
    "id": "c0931",
    "category": "life-admin",
    "difficulty": "brutal",
    "text": "Resolve the administrative problem causing you the most stress. Do it now."
  },
  {
    "id": "c0932",
    "category": "life-admin",
    "difficulty": "brutal",
    "text": "Create a complete household operations system. Do it now."
  },
  {
    "id": "c0933",
    "category": "life-admin",
    "difficulty": "brutal",
    "text": "Tackle every overdue form or document you can reasonably finish. Do it now."
  },
  {
    "id": "c0934",
    "category": "life-admin",
    "difficulty": "brutal",
    "text": "Make all the calls you have been putting off. Do it now."
  },
  {
    "id": "c0935",
    "category": "life-admin",
    "difficulty": "brutal",
    "text": "Close out an unresolved account or service issue. Do it now."
  },
  {
    "id": "c0936",
    "category": "life-admin",
    "difficulty": "brutal",
    "text": "Create a maintenance plan for the next three months. Do it now."
  },
  {
    "id": "c0937",
    "category": "life-admin",
    "difficulty": "brutal",
    "text": "Complete a full life-admin audit. Do it before the end of today."
  },
  {
    "id": "c0938",
    "category": "life-admin",
    "difficulty": "brutal",
    "text": "Spend half a day clearing long-standing bureaucracy. Do it before the end of today."
  },
  {
    "id": "c0939",
    "category": "life-admin",
    "difficulty": "brutal",
    "text": "Resolve the administrative problem causing you the most stress. Do it before the end of today."
  },
  {
    "id": "c0940",
    "category": "life-admin",
    "difficulty": "brutal",
    "text": "Create a complete household operations system. Do it before the end of today."
  },
  {
    "id": "c0941",
    "category": "life-admin",
    "difficulty": "brutal",
    "text": "Tackle every overdue form or document you can reasonably finish. Do it before the end of today."
  },
  {
    "id": "c0942",
    "category": "life-admin",
    "difficulty": "brutal",
    "text": "Make all the calls you have been putting off. Do it before the end of today."
  },
  {
    "id": "c0943",
    "category": "life-admin",
    "difficulty": "brutal",
    "text": "Close out an unresolved account or service issue. Do it before the end of today."
  },
  {
    "id": "c0944",
    "category": "life-admin",
    "difficulty": "brutal",
    "text": "Create a maintenance plan for the next three months. Do it before the end of today."
  },
  {
    "id": "c0945",
    "category": "life-admin",
    "difficulty": "brutal",
    "text": "Complete a full life-admin audit. Do it without overthinking."
  },
  {
    "id": "c0946",
    "category": "life-admin",
    "difficulty": "brutal",
    "text": "Spend half a day clearing long-standing bureaucracy. Do it without overthinking."
  },
  {
    "id": "c0947",
    "category": "life-admin",
    "difficulty": "brutal",
    "text": "Resolve the administrative problem causing you the most stress. Do it without overthinking."
  },
  {
    "id": "c0948",
    "category": "life-admin",
    "difficulty": "brutal",
    "text": "Create a complete household operations system. Do it without overthinking."
  },
  {
    "id": "c0949",
    "category": "life-admin",
    "difficulty": "brutal",
    "text": "Tackle every overdue form or document you can reasonably finish. Do it without overthinking."
  },
  {
    "id": "c0950",
    "category": "life-admin",
    "difficulty": "brutal",
    "text": "Make all the calls you have been putting off. Do it without overthinking."
  },
  {
    "id": "c0951",
    "category": "life-admin",
    "difficulty": "brutal",
    "text": "Close out an unresolved account or service issue. Do it without overthinking."
  },
  {
    "id": "c0952",
    "category": "life-admin",
    "difficulty": "brutal",
    "text": "Create a maintenance plan for the next three months. Do it without overthinking."
  },
  {
    "id": "c0953",
    "category": "life-admin",
    "difficulty": "brutal",
    "text": "Complete a full life-admin audit. Do it and record that you did it."
  },
  {
    "id": "c0954",
    "category": "life-admin",
    "difficulty": "brutal",
    "text": "Spend half a day clearing long-standing bureaucracy. Do it and record that you did it."
  },
  {
    "id": "c0955",
    "category": "life-admin",
    "difficulty": "brutal",
    "text": "Resolve the administrative problem causing you the most stress. Do it and record that you did it."
  },
  {
    "id": "c0956",
    "category": "life-admin",
    "difficulty": "brutal",
    "text": "Create a complete household operations system. Do it and record that you did it."
  },
  {
    "id": "c0957",
    "category": "life-admin",
    "difficulty": "brutal",
    "text": "Tackle every overdue form or document you can reasonably finish. Do it and record that you did it."
  },
  {
    "id": "c0958",
    "category": "life-admin",
    "difficulty": "brutal",
    "text": "Make all the calls you have been putting off. Do it and record that you did it."
  },
  {
    "id": "c0959",
    "category": "life-admin",
    "difficulty": "brutal",
    "text": "Close out an unresolved account or service issue. Do it and record that you did it."
  },
  {
    "id": "c0960",
    "category": "life-admin",
    "difficulty": "brutal",
    "text": "Create a maintenance plan for the next three months. Do it and record that you did it."
  },
  {
    "id": "c0961",
    "category": "life-admin",
    "difficulty": "wild",
    "text": "Let a random number pick an item from your admin list"
  },
  {
    "id": "c0962",
    "category": "life-admin",
    "difficulty": "wild",
    "text": "Do the oldest unfinished admin task first"
  },
  {
    "id": "c0963",
    "category": "life-admin",
    "difficulty": "wild",
    "text": "Set a timer and race your past self for thirty minutes"
  },
  {
    "id": "c0964",
    "category": "life-admin",
    "difficulty": "wild",
    "text": "Ask someone to choose your next admin task"
  },
  {
    "id": "c0965",
    "category": "life-admin",
    "difficulty": "wild",
    "text": "Complete one task you normally outsource or ignore"
  },
  {
    "id": "c0966",
    "category": "life-admin",
    "difficulty": "wild",
    "text": "Create a reward for finishing your worst task"
  },
  {
    "id": "c0967",
    "category": "life-admin",
    "difficulty": "wild",
    "text": "Pick five random emails and deal with each one"
  },
  {
    "id": "c0968",
    "category": "life-admin",
    "difficulty": "wild",
    "text": "Use a coin toss to choose between two avoided tasks"
  },
  {
    "id": "c0969",
    "category": "life-admin",
    "difficulty": "wild",
    "text": "Let a random number pick an item from your admin list. Do it now."
  },
  {
    "id": "c0970",
    "category": "life-admin",
    "difficulty": "wild",
    "text": "Do the oldest unfinished admin task first. Do it now."
  },
  {
    "id": "c0971",
    "category": "life-admin",
    "difficulty": "wild",
    "text": "Set a timer and race your past self for thirty minutes. Do it now."
  },
  {
    "id": "c0972",
    "category": "life-admin",
    "difficulty": "wild",
    "text": "Ask someone to choose your next admin task. Do it now."
  },
  {
    "id": "c0973",
    "category": "life-admin",
    "difficulty": "wild",
    "text": "Complete one task you normally outsource or ignore. Do it now."
  },
  {
    "id": "c0974",
    "category": "life-admin",
    "difficulty": "wild",
    "text": "Create a reward for finishing your worst task. Do it now."
  },
  {
    "id": "c0975",
    "category": "life-admin",
    "difficulty": "wild",
    "text": "Pick five random emails and deal with each one. Do it now."
  },
  {
    "id": "c0976",
    "category": "life-admin",
    "difficulty": "wild",
    "text": "Use a coin toss to choose between two avoided tasks. Do it now."
  },
  {
    "id": "c0977",
    "category": "life-admin",
    "difficulty": "wild",
    "text": "Let a random number pick an item from your admin list. Do it before the end of today."
  },
  {
    "id": "c0978",
    "category": "life-admin",
    "difficulty": "wild",
    "text": "Do the oldest unfinished admin task first. Do it before the end of today."
  },
  {
    "id": "c0979",
    "category": "life-admin",
    "difficulty": "wild",
    "text": "Set a timer and race your past self for thirty minutes. Do it before the end of today."
  },
  {
    "id": "c0980",
    "category": "life-admin",
    "difficulty": "wild",
    "text": "Ask someone to choose your next admin task. Do it before the end of today."
  },
  {
    "id": "c0981",
    "category": "life-admin",
    "difficulty": "wild",
    "text": "Complete one task you normally outsource or ignore. Do it before the end of today."
  },
  {
    "id": "c0982",
    "category": "life-admin",
    "difficulty": "wild",
    "text": "Create a reward for finishing your worst task. Do it before the end of today."
  },
  {
    "id": "c0983",
    "category": "life-admin",
    "difficulty": "wild",
    "text": "Pick five random emails and deal with each one. Do it before the end of today."
  },
  {
    "id": "c0984",
    "category": "life-admin",
    "difficulty": "wild",
    "text": "Use a coin toss to choose between two avoided tasks. Do it before the end of today."
  },
  {
    "id": "c0985",
    "category": "life-admin",
    "difficulty": "wild",
    "text": "Let a random number pick an item from your admin list. Do it without overthinking."
  },
  {
    "id": "c0986",
    "category": "life-admin",
    "difficulty": "wild",
    "text": "Do the oldest unfinished admin task first. Do it without overthinking."
  },
  {
    "id": "c0987",
    "category": "life-admin",
    "difficulty": "wild",
    "text": "Set a timer and race your past self for thirty minutes. Do it without overthinking."
  },
  {
    "id": "c0988",
    "category": "life-admin",
    "difficulty": "wild",
    "text": "Ask someone to choose your next admin task. Do it without overthinking."
  },
  {
    "id": "c0989",
    "category": "life-admin",
    "difficulty": "wild",
    "text": "Complete one task you normally outsource or ignore. Do it without overthinking."
  },
  {
    "id": "c0990",
    "category": "life-admin",
    "difficulty": "wild",
    "text": "Create a reward for finishing your worst task. Do it without overthinking."
  },
  {
    "id": "c0991",
    "category": "life-admin",
    "difficulty": "wild",
    "text": "Pick five random emails and deal with each one. Do it without overthinking."
  },
  {
    "id": "c0992",
    "category": "life-admin",
    "difficulty": "wild",
    "text": "Use a coin toss to choose between two avoided tasks. Do it without overthinking."
  },
  {
    "id": "c0993",
    "category": "life-admin",
    "difficulty": "wild",
    "text": "Let a random number pick an item from your admin list. Do it and record that you did it."
  },
  {
    "id": "c0994",
    "category": "life-admin",
    "difficulty": "wild",
    "text": "Do the oldest unfinished admin task first. Do it and record that you did it."
  },
  {
    "id": "c0995",
    "category": "life-admin",
    "difficulty": "wild",
    "text": "Set a timer and race your past self for thirty minutes. Do it and record that you did it."
  },
  {
    "id": "c0996",
    "category": "life-admin",
    "difficulty": "wild",
    "text": "Ask someone to choose your next admin task. Do it and record that you did it."
  },
  {
    "id": "c0997",
    "category": "life-admin",
    "difficulty": "wild",
    "text": "Complete one task you normally outsource or ignore. Do it and record that you did it."
  },
  {
    "id": "c0998",
    "category": "life-admin",
    "difficulty": "wild",
    "text": "Create a reward for finishing your worst task. Do it and record that you did it."
  },
  {
    "id": "c0999",
    "category": "life-admin",
    "difficulty": "wild",
    "text": "Pick five random emails and deal with each one. Do it and record that you did it."
  },
  {
    "id": "c1000",
    "category": "life-admin",
    "difficulty": "wild",
    "text": "Use a coin toss to choose between two avoided tasks. Do it and record that you did it."
  },
  {
    "id": "c1001",
    "category": "chores",
    "difficulty": "easy",
    "text": "Wash up immediately after your next meal"
  },
  {
    "id": "c1002",
    "category": "chores",
    "difficulty": "easy",
    "text": "Clear one surface completely"
  },
  {
    "id": "c1003",
    "category": "chores",
    "difficulty": "easy",
    "text": "Put away one pile of clothes"
  },
  {
    "id": "c1004",
    "category": "chores",
    "difficulty": "easy",
    "text": "Take out the rubbish"
  },
  {
    "id": "c1005",
    "category": "chores",
    "difficulty": "easy",
    "text": "Clean one mirror"
  },
  {
    "id": "c1006",
    "category": "chores",
    "difficulty": "easy",
    "text": "Vacuum one room"
  },
  {
    "id": "c1007",
    "category": "chores",
    "difficulty": "easy",
    "text": "Change your bedding"
  },
  {
    "id": "c1008",
    "category": "chores",
    "difficulty": "easy",
    "text": "Wipe down your kitchen worktops"
  },
  {
    "id": "c1009",
    "category": "chores",
    "difficulty": "easy",
    "text": "Wash up immediately after your next meal. Do it now."
  },
  {
    "id": "c1010",
    "category": "chores",
    "difficulty": "easy",
    "text": "Clear one surface completely. Do it now."
  },
  {
    "id": "c1011",
    "category": "chores",
    "difficulty": "easy",
    "text": "Put away one pile of clothes. Do it now."
  },
  {
    "id": "c1012",
    "category": "chores",
    "difficulty": "easy",
    "text": "Take out the rubbish. Do it now."
  },
  {
    "id": "c1013",
    "category": "chores",
    "difficulty": "easy",
    "text": "Clean one mirror. Do it now."
  },
  {
    "id": "c1014",
    "category": "chores",
    "difficulty": "easy",
    "text": "Vacuum one room. Do it now."
  },
  {
    "id": "c1015",
    "category": "chores",
    "difficulty": "easy",
    "text": "Change your bedding. Do it now."
  },
  {
    "id": "c1016",
    "category": "chores",
    "difficulty": "easy",
    "text": "Wipe down your kitchen worktops. Do it now."
  },
  {
    "id": "c1017",
    "category": "chores",
    "difficulty": "easy",
    "text": "Wash up immediately after your next meal. Do it before the end of today."
  },
  {
    "id": "c1018",
    "category": "chores",
    "difficulty": "easy",
    "text": "Clear one surface completely. Do it before the end of today."
  },
  {
    "id": "c1019",
    "category": "chores",
    "difficulty": "easy",
    "text": "Put away one pile of clothes. Do it before the end of today."
  },
  {
    "id": "c1020",
    "category": "chores",
    "difficulty": "easy",
    "text": "Take out the rubbish. Do it before the end of today."
  },
  {
    "id": "c1021",
    "category": "chores",
    "difficulty": "easy",
    "text": "Clean one mirror. Do it before the end of today."
  },
  {
    "id": "c1022",
    "category": "chores",
    "difficulty": "easy",
    "text": "Vacuum one room. Do it before the end of today."
  },
  {
    "id": "c1023",
    "category": "chores",
    "difficulty": "easy",
    "text": "Change your bedding. Do it before the end of today."
  },
  {
    "id": "c1024",
    "category": "chores",
    "difficulty": "easy",
    "text": "Wipe down your kitchen worktops. Do it before the end of today."
  },
  {
    "id": "c1025",
    "category": "chores",
    "difficulty": "easy",
    "text": "Wash up immediately after your next meal. Do it without overthinking."
  },
  {
    "id": "c1026",
    "category": "chores",
    "difficulty": "easy",
    "text": "Clear one surface completely. Do it without overthinking."
  },
  {
    "id": "c1027",
    "category": "chores",
    "difficulty": "easy",
    "text": "Put away one pile of clothes. Do it without overthinking."
  },
  {
    "id": "c1028",
    "category": "chores",
    "difficulty": "easy",
    "text": "Take out the rubbish. Do it without overthinking."
  },
  {
    "id": "c1029",
    "category": "chores",
    "difficulty": "easy",
    "text": "Clean one mirror. Do it without overthinking."
  },
  {
    "id": "c1030",
    "category": "chores",
    "difficulty": "easy",
    "text": "Vacuum one room. Do it without overthinking."
  },
  {
    "id": "c1031",
    "category": "chores",
    "difficulty": "easy",
    "text": "Change your bedding. Do it without overthinking."
  },
  {
    "id": "c1032",
    "category": "chores",
    "difficulty": "easy",
    "text": "Wipe down your kitchen worktops. Do it without overthinking."
  },
  {
    "id": "c1033",
    "category": "chores",
    "difficulty": "easy",
    "text": "Wash up immediately after your next meal. Do it and record that you did it."
  },
  {
    "id": "c1034",
    "category": "chores",
    "difficulty": "easy",
    "text": "Clear one surface completely. Do it and record that you did it."
  },
  {
    "id": "c1035",
    "category": "chores",
    "difficulty": "easy",
    "text": "Put away one pile of clothes. Do it and record that you did it."
  },
  {
    "id": "c1036",
    "category": "chores",
    "difficulty": "easy",
    "text": "Take out the rubbish. Do it and record that you did it."
  },
  {
    "id": "c1037",
    "category": "chores",
    "difficulty": "easy",
    "text": "Clean one mirror. Do it and record that you did it."
  },
  {
    "id": "c1038",
    "category": "chores",
    "difficulty": "easy",
    "text": "Vacuum one room. Do it and record that you did it."
  },
  {
    "id": "c1039",
    "category": "chores",
    "difficulty": "easy",
    "text": "Change your bedding. Do it and record that you did it."
  },
  {
    "id": "c1040",
    "category": "chores",
    "difficulty": "easy",
    "text": "Wipe down your kitchen worktops. Do it and record that you did it."
  },
  {
    "id": "c1041",
    "category": "chores",
    "difficulty": "normal",
    "text": "Deep clean one room"
  },
  {
    "id": "c1042",
    "category": "chores",
    "difficulty": "normal",
    "text": "Declutter one drawer or cupboard"
  },
  {
    "id": "c1043",
    "category": "chores",
    "difficulty": "normal",
    "text": "Clean out your fridge"
  },
  {
    "id": "c1044",
    "category": "chores",
    "difficulty": "normal",
    "text": "Organise your wardrobe for thirty minutes"
  },
  {
    "id": "c1045",
    "category": "chores",
    "difficulty": "normal",
    "text": "Wash and put away all accumulated laundry"
  },
  {
    "id": "c1046",
    "category": "chores",
    "difficulty": "normal",
    "text": "Clean an area you usually ignore"
  },
  {
    "id": "c1047",
    "category": "chores",
    "difficulty": "normal",
    "text": "Sort a bag for donation"
  },
  {
    "id": "c1048",
    "category": "chores",
    "difficulty": "normal",
    "text": "Create a simple cleaning routine"
  },
  {
    "id": "c1049",
    "category": "chores",
    "difficulty": "normal",
    "text": "Deep clean one room. Do it now."
  },
  {
    "id": "c1050",
    "category": "chores",
    "difficulty": "normal",
    "text": "Declutter one drawer or cupboard. Do it now."
  },
  {
    "id": "c1051",
    "category": "chores",
    "difficulty": "normal",
    "text": "Clean out your fridge. Do it now."
  },
  {
    "id": "c1052",
    "category": "chores",
    "difficulty": "normal",
    "text": "Organise your wardrobe for thirty minutes. Do it now."
  },
  {
    "id": "c1053",
    "category": "chores",
    "difficulty": "normal",
    "text": "Wash and put away all accumulated laundry. Do it now."
  },
  {
    "id": "c1054",
    "category": "chores",
    "difficulty": "normal",
    "text": "Clean an area you usually ignore. Do it now."
  },
  {
    "id": "c1055",
    "category": "chores",
    "difficulty": "normal",
    "text": "Sort a bag for donation. Do it now."
  },
  {
    "id": "c1056",
    "category": "chores",
    "difficulty": "normal",
    "text": "Create a simple cleaning routine. Do it now."
  },
  {
    "id": "c1057",
    "category": "chores",
    "difficulty": "normal",
    "text": "Deep clean one room. Do it before the end of today."
  },
  {
    "id": "c1058",
    "category": "chores",
    "difficulty": "normal",
    "text": "Declutter one drawer or cupboard. Do it before the end of today."
  },
  {
    "id": "c1059",
    "category": "chores",
    "difficulty": "normal",
    "text": "Clean out your fridge. Do it before the end of today."
  },
  {
    "id": "c1060",
    "category": "chores",
    "difficulty": "normal",
    "text": "Organise your wardrobe for thirty minutes. Do it before the end of today."
  },
  {
    "id": "c1061",
    "category": "chores",
    "difficulty": "normal",
    "text": "Wash and put away all accumulated laundry. Do it before the end of today."
  },
  {
    "id": "c1062",
    "category": "chores",
    "difficulty": "normal",
    "text": "Clean an area you usually ignore. Do it before the end of today."
  },
  {
    "id": "c1063",
    "category": "chores",
    "difficulty": "normal",
    "text": "Sort a bag for donation. Do it before the end of today."
  },
  {
    "id": "c1064",
    "category": "chores",
    "difficulty": "normal",
    "text": "Create a simple cleaning routine. Do it before the end of today."
  },
  {
    "id": "c1065",
    "category": "chores",
    "difficulty": "normal",
    "text": "Deep clean one room. Do it without overthinking."
  },
  {
    "id": "c1066",
    "category": "chores",
    "difficulty": "normal",
    "text": "Declutter one drawer or cupboard. Do it without overthinking."
  },
  {
    "id": "c1067",
    "category": "chores",
    "difficulty": "normal",
    "text": "Clean out your fridge. Do it without overthinking."
  },
  {
    "id": "c1068",
    "category": "chores",
    "difficulty": "normal",
    "text": "Organise your wardrobe for thirty minutes. Do it without overthinking."
  },
  {
    "id": "c1069",
    "category": "chores",
    "difficulty": "normal",
    "text": "Wash and put away all accumulated laundry. Do it without overthinking."
  },
  {
    "id": "c1070",
    "category": "chores",
    "difficulty": "normal",
    "text": "Clean an area you usually ignore. Do it without overthinking."
  },
  {
    "id": "c1071",
    "category": "chores",
    "difficulty": "normal",
    "text": "Sort a bag for donation. Do it without overthinking."
  },
  {
    "id": "c1072",
    "category": "chores",
    "difficulty": "normal",
    "text": "Create a simple cleaning routine. Do it without overthinking."
  },
  {
    "id": "c1073",
    "category": "chores",
    "difficulty": "normal",
    "text": "Deep clean one room. Do it and record that you did it."
  },
  {
    "id": "c1074",
    "category": "chores",
    "difficulty": "normal",
    "text": "Declutter one drawer or cupboard. Do it and record that you did it."
  },
  {
    "id": "c1075",
    "category": "chores",
    "difficulty": "normal",
    "text": "Clean out your fridge. Do it and record that you did it."
  },
  {
    "id": "c1076",
    "category": "chores",
    "difficulty": "normal",
    "text": "Organise your wardrobe for thirty minutes. Do it and record that you did it."
  },
  {
    "id": "c1077",
    "category": "chores",
    "difficulty": "normal",
    "text": "Wash and put away all accumulated laundry. Do it and record that you did it."
  },
  {
    "id": "c1078",
    "category": "chores",
    "difficulty": "normal",
    "text": "Clean an area you usually ignore. Do it and record that you did it."
  },
  {
    "id": "c1079",
    "category": "chores",
    "difficulty": "normal",
    "text": "Sort a bag for donation. Do it and record that you did it."
  },
  {
    "id": "c1080",
    "category": "chores",
    "difficulty": "normal",
    "text": "Create a simple cleaning routine. Do it and record that you did it."
  },
  {
    "id": "c1081",
    "category": "chores",
    "difficulty": "challenge",
    "text": "Declutter one category of possessions"
  },
  {
    "id": "c1082",
    "category": "chores",
    "difficulty": "challenge",
    "text": "Clean the most neglected area in your home"
  },
  {
    "id": "c1083",
    "category": "chores",
    "difficulty": "challenge",
    "text": "Fill one donation bag and remove it from the house"
  },
  {
    "id": "c1084",
    "category": "chores",
    "difficulty": "challenge",
    "text": "Spend two hours resetting your living space"
  },
  {
    "id": "c1085",
    "category": "chores",
    "difficulty": "challenge",
    "text": "Organise a storage area you avoid opening"
  },
  {
    "id": "c1086",
    "category": "chores",
    "difficulty": "challenge",
    "text": "Clean behind or beneath a large piece of furniture"
  },
  {
    "id": "c1087",
    "category": "chores",
    "difficulty": "challenge",
    "text": "Complete every small chore on your list"
  },
  {
    "id": "c1088",
    "category": "chores",
    "difficulty": "challenge",
    "text": "Tackle a household job you have postponed for months"
  },
  {
    "id": "c1089",
    "category": "chores",
    "difficulty": "challenge",
    "text": "Declutter one category of possessions. Do it now."
  },
  {
    "id": "c1090",
    "category": "chores",
    "difficulty": "challenge",
    "text": "Clean the most neglected area in your home. Do it now."
  },
  {
    "id": "c1091",
    "category": "chores",
    "difficulty": "challenge",
    "text": "Fill one donation bag and remove it from the house. Do it now."
  },
  {
    "id": "c1092",
    "category": "chores",
    "difficulty": "challenge",
    "text": "Spend two hours resetting your living space. Do it now."
  },
  {
    "id": "c1093",
    "category": "chores",
    "difficulty": "challenge",
    "text": "Organise a storage area you avoid opening. Do it now."
  },
  {
    "id": "c1094",
    "category": "chores",
    "difficulty": "challenge",
    "text": "Clean behind or beneath a large piece of furniture. Do it now."
  },
  {
    "id": "c1095",
    "category": "chores",
    "difficulty": "challenge",
    "text": "Complete every small chore on your list. Do it now."
  },
  {
    "id": "c1096",
    "category": "chores",
    "difficulty": "challenge",
    "text": "Tackle a household job you have postponed for months. Do it now."
  },
  {
    "id": "c1097",
    "category": "chores",
    "difficulty": "challenge",
    "text": "Declutter one category of possessions. Do it before the end of today."
  },
  {
    "id": "c1098",
    "category": "chores",
    "difficulty": "challenge",
    "text": "Clean the most neglected area in your home. Do it before the end of today."
  },
  {
    "id": "c1099",
    "category": "chores",
    "difficulty": "challenge",
    "text": "Fill one donation bag and remove it from the house. Do it before the end of today."
  },
  {
    "id": "c1100",
    "category": "chores",
    "difficulty": "challenge",
    "text": "Spend two hours resetting your living space. Do it before the end of today."
  },
  {
    "id": "c1101",
    "category": "chores",
    "difficulty": "challenge",
    "text": "Organise a storage area you avoid opening. Do it before the end of today."
  },
  {
    "id": "c1102",
    "category": "chores",
    "difficulty": "challenge",
    "text": "Clean behind or beneath a large piece of furniture. Do it before the end of today."
  },
  {
    "id": "c1103",
    "category": "chores",
    "difficulty": "challenge",
    "text": "Complete every small chore on your list. Do it before the end of today."
  },
  {
    "id": "c1104",
    "category": "chores",
    "difficulty": "challenge",
    "text": "Tackle a household job you have postponed for months. Do it before the end of today."
  },
  {
    "id": "c1105",
    "category": "chores",
    "difficulty": "challenge",
    "text": "Declutter one category of possessions. Do it without overthinking."
  },
  {
    "id": "c1106",
    "category": "chores",
    "difficulty": "challenge",
    "text": "Clean the most neglected area in your home. Do it without overthinking."
  },
  {
    "id": "c1107",
    "category": "chores",
    "difficulty": "challenge",
    "text": "Fill one donation bag and remove it from the house. Do it without overthinking."
  },
  {
    "id": "c1108",
    "category": "chores",
    "difficulty": "challenge",
    "text": "Spend two hours resetting your living space. Do it without overthinking."
  },
  {
    "id": "c1109",
    "category": "chores",
    "difficulty": "challenge",
    "text": "Organise a storage area you avoid opening. Do it without overthinking."
  },
  {
    "id": "c1110",
    "category": "chores",
    "difficulty": "challenge",
    "text": "Clean behind or beneath a large piece of furniture. Do it without overthinking."
  },
  {
    "id": "c1111",
    "category": "chores",
    "difficulty": "challenge",
    "text": "Complete every small chore on your list. Do it without overthinking."
  },
  {
    "id": "c1112",
    "category": "chores",
    "difficulty": "challenge",
    "text": "Tackle a household job you have postponed for months. Do it without overthinking."
  },
  {
    "id": "c1113",
    "category": "chores",
    "difficulty": "challenge",
    "text": "Declutter one category of possessions. Do it and record that you did it."
  },
  {
    "id": "c1114",
    "category": "chores",
    "difficulty": "challenge",
    "text": "Clean the most neglected area in your home. Do it and record that you did it."
  },
  {
    "id": "c1115",
    "category": "chores",
    "difficulty": "challenge",
    "text": "Fill one donation bag and remove it from the house. Do it and record that you did it."
  },
  {
    "id": "c1116",
    "category": "chores",
    "difficulty": "challenge",
    "text": "Spend two hours resetting your living space. Do it and record that you did it."
  },
  {
    "id": "c1117",
    "category": "chores",
    "difficulty": "challenge",
    "text": "Organise a storage area you avoid opening. Do it and record that you did it."
  },
  {
    "id": "c1118",
    "category": "chores",
    "difficulty": "challenge",
    "text": "Clean behind or beneath a large piece of furniture. Do it and record that you did it."
  },
  {
    "id": "c1119",
    "category": "chores",
    "difficulty": "challenge",
    "text": "Complete every small chore on your list. Do it and record that you did it."
  },
  {
    "id": "c1120",
    "category": "chores",
    "difficulty": "challenge",
    "text": "Tackle a household job you have postponed for months. Do it and record that you did it."
  },
  {
    "id": "c1121",
    "category": "chores",
    "difficulty": "brutal",
    "text": "Complete a full-room deep clean"
  },
  {
    "id": "c1122",
    "category": "chores",
    "difficulty": "brutal",
    "text": "Spend half a day decluttering"
  },
  {
    "id": "c1123",
    "category": "chores",
    "difficulty": "brutal",
    "text": "Empty and reorganise your most chaotic storage space"
  },
  {
    "id": "c1124",
    "category": "chores",
    "difficulty": "brutal",
    "text": "Complete the household task you hate most"
  },
  {
    "id": "c1125",
    "category": "chores",
    "difficulty": "brutal",
    "text": "Do a full home reset before relaxing"
  },
  {
    "id": "c1126",
    "category": "chores",
    "difficulty": "brutal",
    "text": "Remove fifty items you no longer need"
  },
  {
    "id": "c1127",
    "category": "chores",
    "difficulty": "brutal",
    "text": "Deep clean an entire neglected zone"
  },
  {
    "id": "c1128",
    "category": "chores",
    "difficulty": "brutal",
    "text": "Finish all outstanding household maintenance tasks you reasonably can"
  },
  {
    "id": "c1129",
    "category": "chores",
    "difficulty": "brutal",
    "text": "Complete a full-room deep clean. Do it now."
  },
  {
    "id": "c1130",
    "category": "chores",
    "difficulty": "brutal",
    "text": "Spend half a day decluttering. Do it now."
  },
  {
    "id": "c1131",
    "category": "chores",
    "difficulty": "brutal",
    "text": "Empty and reorganise your most chaotic storage space. Do it now."
  },
  {
    "id": "c1132",
    "category": "chores",
    "difficulty": "brutal",
    "text": "Complete the household task you hate most. Do it now."
  },
  {
    "id": "c1133",
    "category": "chores",
    "difficulty": "brutal",
    "text": "Do a full home reset before relaxing. Do it now."
  },
  {
    "id": "c1134",
    "category": "chores",
    "difficulty": "brutal",
    "text": "Remove fifty items you no longer need. Do it now."
  },
  {
    "id": "c1135",
    "category": "chores",
    "difficulty": "brutal",
    "text": "Deep clean an entire neglected zone. Do it now."
  },
  {
    "id": "c1136",
    "category": "chores",
    "difficulty": "brutal",
    "text": "Finish all outstanding household maintenance tasks you reasonably can. Do it now."
  },
  {
    "id": "c1137",
    "category": "chores",
    "difficulty": "brutal",
    "text": "Complete a full-room deep clean. Do it before the end of today."
  },
  {
    "id": "c1138",
    "category": "chores",
    "difficulty": "brutal",
    "text": "Spend half a day decluttering. Do it before the end of today."
  },
  {
    "id": "c1139",
    "category": "chores",
    "difficulty": "brutal",
    "text": "Empty and reorganise your most chaotic storage space. Do it before the end of today."
  },
  {
    "id": "c1140",
    "category": "chores",
    "difficulty": "brutal",
    "text": "Complete the household task you hate most. Do it before the end of today."
  },
  {
    "id": "c1141",
    "category": "chores",
    "difficulty": "brutal",
    "text": "Do a full home reset before relaxing. Do it before the end of today."
  },
  {
    "id": "c1142",
    "category": "chores",
    "difficulty": "brutal",
    "text": "Remove fifty items you no longer need. Do it before the end of today."
  },
  {
    "id": "c1143",
    "category": "chores",
    "difficulty": "brutal",
    "text": "Deep clean an entire neglected zone. Do it before the end of today."
  },
  {
    "id": "c1144",
    "category": "chores",
    "difficulty": "brutal",
    "text": "Finish all outstanding household maintenance tasks you reasonably can. Do it before the end of today."
  },
  {
    "id": "c1145",
    "category": "chores",
    "difficulty": "brutal",
    "text": "Complete a full-room deep clean. Do it without overthinking."
  },
  {
    "id": "c1146",
    "category": "chores",
    "difficulty": "brutal",
    "text": "Spend half a day decluttering. Do it without overthinking."
  },
  {
    "id": "c1147",
    "category": "chores",
    "difficulty": "brutal",
    "text": "Empty and reorganise your most chaotic storage space. Do it without overthinking."
  },
  {
    "id": "c1148",
    "category": "chores",
    "difficulty": "brutal",
    "text": "Complete the household task you hate most. Do it without overthinking."
  },
  {
    "id": "c1149",
    "category": "chores",
    "difficulty": "brutal",
    "text": "Do a full home reset before relaxing. Do it without overthinking."
  },
  {
    "id": "c1150",
    "category": "chores",
    "difficulty": "brutal",
    "text": "Remove fifty items you no longer need. Do it without overthinking."
  },
  {
    "id": "c1151",
    "category": "chores",
    "difficulty": "brutal",
    "text": "Deep clean an entire neglected zone. Do it without overthinking."
  },
  {
    "id": "c1152",
    "category": "chores",
    "difficulty": "brutal",
    "text": "Finish all outstanding household maintenance tasks you reasonably can. Do it without overthinking."
  },
  {
    "id": "c1153",
    "category": "chores",
    "difficulty": "brutal",
    "text": "Complete a full-room deep clean. Do it and record that you did it."
  },
  {
    "id": "c1154",
    "category": "chores",
    "difficulty": "brutal",
    "text": "Spend half a day decluttering. Do it and record that you did it."
  },
  {
    "id": "c1155",
    "category": "chores",
    "difficulty": "brutal",
    "text": "Empty and reorganise your most chaotic storage space. Do it and record that you did it."
  },
  {
    "id": "c1156",
    "category": "chores",
    "difficulty": "brutal",
    "text": "Complete the household task you hate most. Do it and record that you did it."
  },
  {
    "id": "c1157",
    "category": "chores",
    "difficulty": "brutal",
    "text": "Do a full home reset before relaxing. Do it and record that you did it."
  },
  {
    "id": "c1158",
    "category": "chores",
    "difficulty": "brutal",
    "text": "Remove fifty items you no longer need. Do it and record that you did it."
  },
  {
    "id": "c1159",
    "category": "chores",
    "difficulty": "brutal",
    "text": "Deep clean an entire neglected zone. Do it and record that you did it."
  },
  {
    "id": "c1160",
    "category": "chores",
    "difficulty": "brutal",
    "text": "Finish all outstanding household maintenance tasks you reasonably can. Do it and record that you did it."
  },
  {
    "id": "c1161",
    "category": "chores",
    "difficulty": "wild",
    "text": "Let a random number choose the room you clean"
  },
  {
    "id": "c1162",
    "category": "chores",
    "difficulty": "wild",
    "text": "Set a playlist and clean until it ends"
  },
  {
    "id": "c1163",
    "category": "chores",
    "difficulty": "wild",
    "text": "Ask someone else to assign you one household task"
  },
  {
    "id": "c1164",
    "category": "chores",
    "difficulty": "wild",
    "text": "Use a timer and turn cleaning into a race"
  },
  {
    "id": "c1165",
    "category": "chores",
    "difficulty": "wild",
    "text": "Pick the strangest neglected object in the room and clean around it"
  },
  {
    "id": "c1166",
    "category": "chores",
    "difficulty": "wild",
    "text": "Do chores in reverse order from your usual routine"
  },
  {
    "id": "c1167",
    "category": "chores",
    "difficulty": "wild",
    "text": "Choose one room with your eyes closed and improve it"
  },
  {
    "id": "c1168",
    "category": "chores",
    "difficulty": "wild",
    "text": "Spend twenty minutes making one area unexpectedly beautiful"
  },
  {
    "id": "c1169",
    "category": "chores",
    "difficulty": "wild",
    "text": "Let a random number choose the room you clean. Do it now."
  },
  {
    "id": "c1170",
    "category": "chores",
    "difficulty": "wild",
    "text": "Set a playlist and clean until it ends. Do it now."
  },
  {
    "id": "c1171",
    "category": "chores",
    "difficulty": "wild",
    "text": "Ask someone else to assign you one household task. Do it now."
  },
  {
    "id": "c1172",
    "category": "chores",
    "difficulty": "wild",
    "text": "Use a timer and turn cleaning into a race. Do it now."
  },
  {
    "id": "c1173",
    "category": "chores",
    "difficulty": "wild",
    "text": "Pick the strangest neglected object in the room and clean around it. Do it now."
  },
  {
    "id": "c1174",
    "category": "chores",
    "difficulty": "wild",
    "text": "Do chores in reverse order from your usual routine. Do it now."
  },
  {
    "id": "c1175",
    "category": "chores",
    "difficulty": "wild",
    "text": "Choose one room with your eyes closed and improve it. Do it now."
  },
  {
    "id": "c1176",
    "category": "chores",
    "difficulty": "wild",
    "text": "Spend twenty minutes making one area unexpectedly beautiful. Do it now."
  },
  {
    "id": "c1177",
    "category": "chores",
    "difficulty": "wild",
    "text": "Let a random number choose the room you clean. Do it before the end of today."
  },
  {
    "id": "c1178",
    "category": "chores",
    "difficulty": "wild",
    "text": "Set a playlist and clean until it ends. Do it before the end of today."
  },
  {
    "id": "c1179",
    "category": "chores",
    "difficulty": "wild",
    "text": "Ask someone else to assign you one household task. Do it before the end of today."
  },
  {
    "id": "c1180",
    "category": "chores",
    "difficulty": "wild",
    "text": "Use a timer and turn cleaning into a race. Do it before the end of today."
  },
  {
    "id": "c1181",
    "category": "chores",
    "difficulty": "wild",
    "text": "Pick the strangest neglected object in the room and clean around it. Do it before the end of today."
  },
  {
    "id": "c1182",
    "category": "chores",
    "difficulty": "wild",
    "text": "Do chores in reverse order from your usual routine. Do it before the end of today."
  },
  {
    "id": "c1183",
    "category": "chores",
    "difficulty": "wild",
    "text": "Choose one room with your eyes closed and improve it. Do it before the end of today."
  },
  {
    "id": "c1184",
    "category": "chores",
    "difficulty": "wild",
    "text": "Spend twenty minutes making one area unexpectedly beautiful. Do it before the end of today."
  },
  {
    "id": "c1185",
    "category": "chores",
    "difficulty": "wild",
    "text": "Let a random number choose the room you clean. Do it without overthinking."
  },
  {
    "id": "c1186",
    "category": "chores",
    "difficulty": "wild",
    "text": "Set a playlist and clean until it ends. Do it without overthinking."
  },
  {
    "id": "c1187",
    "category": "chores",
    "difficulty": "wild",
    "text": "Ask someone else to assign you one household task. Do it without overthinking."
  },
  {
    "id": "c1188",
    "category": "chores",
    "difficulty": "wild",
    "text": "Use a timer and turn cleaning into a race. Do it without overthinking."
  },
  {
    "id": "c1189",
    "category": "chores",
    "difficulty": "wild",
    "text": "Pick the strangest neglected object in the room and clean around it. Do it without overthinking."
  },
  {
    "id": "c1190",
    "category": "chores",
    "difficulty": "wild",
    "text": "Do chores in reverse order from your usual routine. Do it without overthinking."
  },
  {
    "id": "c1191",
    "category": "chores",
    "difficulty": "wild",
    "text": "Choose one room with your eyes closed and improve it. Do it without overthinking."
  },
  {
    "id": "c1192",
    "category": "chores",
    "difficulty": "wild",
    "text": "Spend twenty minutes making one area unexpectedly beautiful. Do it without overthinking."
  },
  {
    "id": "c1193",
    "category": "chores",
    "difficulty": "wild",
    "text": "Let a random number choose the room you clean. Do it and record that you did it."
  },
  {
    "id": "c1194",
    "category": "chores",
    "difficulty": "wild",
    "text": "Set a playlist and clean until it ends. Do it and record that you did it."
  },
  {
    "id": "c1195",
    "category": "chores",
    "difficulty": "wild",
    "text": "Ask someone else to assign you one household task. Do it and record that you did it."
  },
  {
    "id": "c1196",
    "category": "chores",
    "difficulty": "wild",
    "text": "Use a timer and turn cleaning into a race. Do it and record that you did it."
  },
  {
    "id": "c1197",
    "category": "chores",
    "difficulty": "wild",
    "text": "Pick the strangest neglected object in the room and clean around it. Do it and record that you did it."
  },
  {
    "id": "c1198",
    "category": "chores",
    "difficulty": "wild",
    "text": "Do chores in reverse order from your usual routine. Do it and record that you did it."
  },
  {
    "id": "c1199",
    "category": "chores",
    "difficulty": "wild",
    "text": "Choose one room with your eyes closed and improve it. Do it and record that you did it."
  },
  {
    "id": "c1200",
    "category": "chores",
    "difficulty": "wild",
    "text": "Spend twenty minutes making one area unexpectedly beautiful. Do it and record that you did it."
  }
];

// Backwards-compatible global access
window.STARTER_CHALLENGES = STARTER_CHALLENGES;
