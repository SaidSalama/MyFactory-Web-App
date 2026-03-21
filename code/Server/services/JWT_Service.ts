// Import the entire jsonwebtoken library as 'jwt'
// This gives us access to functions like sign() and verify()
import * as jwt from "jsonwebtoken";

import type { Users } from "../../models/users";

// JWTService is a class that handles all JWT operations
// It's a singleton - we create one instance and reuse it everywhere
class JWTService {
	// SECRET: This is the most important part!
	// It's like a "password" that the server uses to sign tokens
	// NEVER share this or commit it to GitHub!
	// In production: Always use environment variable
	// In development: Falls back to default string (but change it!)
	private secret =
		process.env.JWT_SECRET || "your-super-secret-key-change-this";

	// EXPIRATION: Tokens expire after 24 hours
	// Format: '24h' = 24 hours, '7d' = 7 days, '60m' = 60 minutes
	// Why? If token is stolen, it's only valid for 24 hours
	private expiresIn = "24h";

	// SIGN: Creates a new JWT token
	// Input: User data we want to store in the token
	// Output: A JWT token string (looks like: eyJhbGc...xyz)
	sign(payload: Partial<Users>): string {
		// jwt.sign() does 3 things:
		// 1. Takes the payload and adds timestamps (iat = issued at, exp = expires)
		// 2. Hashes everything with the secret key
		// 3. Returns a 3-part string: header.payload.signature
		return (jwt as any).default.sign(payload, this.secret, {
			// expiresIn tells JWT when this token should expire
			// The 'as' keyword tells TypeScript "trust me, this is the correct format"
			expiresIn: this.expiresIn as jwt.SignOptions["expiresIn"],
		});
	}

	// VERIFY: Checks if a token is valid
	// Input: Token string from client
	// Output: If valid → original payload (user data)
	//         If invalid → null
	verify(token: string): any {
		try {
			// jwt.verify() does 3 checks:
			// 1. Was this token signed with our secret? (prevents tampering)
			// 2. Has the token expired? (checks exp timestamp)
			// 3. Is the token format valid?
			// If all good: returns the decoded payload

			return (jwt as any).default.verify(token, this.secret);
		} catch (error) {
			// If ANYTHING is wrong with the token:
			// - Wrong signature
			// - Expired
			// - Malformed
			// - Wrong algorithm
			// We return null (invalid token)

			return null;
		}
	}
}

// Export a SINGLE instance of JWTService
export default new JWTService();
