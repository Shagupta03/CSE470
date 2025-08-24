// controllers/guidelineController.js
exports.getGuideline = (req, res) => {
  const guidelineMessage = `
📝 Women Travel Admin Guideline

Welcome to Women Travel!
These guidelines are designed to ensure a safe, enjoyable, and responsible travel experience for all users.

1. Safety First
- Verify all trip plans before publishing.
- Ensure recommended locations are safe for women travelers.
- Monitor user reports of unsafe situations and act promptly.

2. User Communication
- Respond to user queries within 24 hours.
- Maintain a polite and professional tone in all communications.
- Encourage users to share honest reviews and experiences.

3. Content Moderation
- Check that trip descriptions, images, and guides follow platform rules.
- Remove inappropriate content immediately.
- Monitor for scams or misleading trip information.

4. Emergency Protocols
- Ensure the Emergency Button feature is functional.
- Respond quickly to any alerts sent by users.
- Maintain a list of local authorities and hotlines for reference.

5. Trip Approvals
- Verify trip details: location, date, and travel safety.
- Ensure accommodation and transport info are reliable.
- Approve trips only if they meet the safety and quality standards.

6. User Privacy
- Never share personal user information without consent.
- Ensure data is stored securely.
- Respect user anonymity when requested.

7. Community Guidelines
- Encourage respectful behavior among users.
- Discourage offensive language, harassment, or discriminatory behavior.
- Promote a friendly and supportive travel community.

Tip for Admins:
Regularly review the platform for improvements and updates to safety procedures. Your diligence ensures Women Travel remains a trusted, safe, and empowering platform for all women travelers.
`;

  res.status(200).json({ message: guidelineMessage });
};
