import axios from "axios";
import { beforeAll, describe, expect, it } from "vitest";

const BASE_URL = "http://localhost:3000";

describe("POST /api/auth/signup", () => {
  it("should fail when invalid input is sent ", async () => {

    try {
      const response = await axios.post(`${BASE_URL}/api/auth/signup`, {
        name: "nagmani",
        email: "nagmani",
        password: "password",
        role: "student"
      });

      expect(response.status).toBe(400);
      expect(response.data).toStrictEqual({
        success: false,
        error: "Invalid request schema",
        details: { email: "Invalid email format" }
      });
    } catch (err) {

    }
  });

  it("should signup the user when sent right inputs for student ", async () => {
    const response = await axios.post(`${BASE_URL}/api/auth/signup`, {
      name: "nagmani",
      email: "nagmani@gmail.com",
      password: "password",
      role: "student"
    });

    expect(response.status).toBe(201);
    const status = response.data.success;
    const data = response.data.data;

    expect(status).toBe(true);
    expect(data._id).toBeDefined();

    expect(data.name).toBe("nagmani");
    expect(data.email).toBe("nagmani@gmail.com");
    expect(data.role).toBe("student");
  });

  it("should signup the user when sent right inputs for admin", async () => {
    const response = await axios.post(`${BASE_URL}/api/auth/signup`, {
      name: "nagmaniAdmin",
      email: "nagmaniadmin@gmail.com",
      password: "passwordAdmin",
      role: "admin"
    });
    expect(response.status).toBe(201);
    const status = response.data.success;
    const data = response.data.data;

    expect(status).toBe(true);
    expect(data._id).toBeDefined();

    expect(data.name).toBe("nagmaniAdmin");
    expect(data.email).toBe("nagmaniadmin@gmail.com");
    expect(data.role).toBe("admin");
  });

  it("should fail when user signs up with same email again", async () => {
    try {
      const response = await axios.post(`${BASE_URL}/api/auth/signup`, {
        name: "nagmani",
        email: "nagmani@gmail.com",
        password: "password",
        role: "student"
      });

      expect(response.status).toBe(400);
      expect(response.data).toStrictEqual({
        success: false,
        error: "User with this email already exists",
        details: { email: "Already Exists" },
      });
    } catch (err) {

    }
  });
});

describe("POST /api/auth/login", () => {

  it("should fail when invalid input is sent", async () => {
    try {
      const response = await axios.post(`${BASE_URL}/api/auth/login`, {
        email: "nagmani",
        password: "password",
      });
      expect(response.status).toBe(400);
      expect(response.data).toStrictEqual({
        success: false,
        error: "Invalid request schema",
        details: { email: "Invalid email format" }
      });

    } catch (err) {
    }

  });

  it("should fail when trying to login with wrong credentials", async () => {
    try {
      const response = await axios.post(`${BASE_URL}/api/auth/login`, {
        email: "nagmani@gmail.com",
        password: "wrongPassword",
      });

      expect(response.status).toBe(400);
      expect(response.data).toStrictEqual({
        success: false,
        error: "Invalid email or password"
      });
    } catch (err) {

    }
  });

  it("should successfully login when right credentials are sent", async () => {
    const response = await axios.post(`${BASE_URL}/api/auth/login`, {
      email: "nagmani@gmail.com",
      password: "password",
    });

    expect(response.status).toBe(200);
    expect(response.data.success).toBe(true);
    expect(response.data.data.token).toBeDefined()
  });
});

describe("GET /api/auth/me", () => {
  let token: any;

  beforeAll(async () => {

    const response = await axios.post(`${BASE_URL}/api/auth/login`, {
      email: "nagmani@gmail.com",
      password: "password",
    });

    token = response.data.data.token;
  });

  it("should respond with Unauthorized when sent wrong token", async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/auth/me`, {
        headers: {
          Authorization: "gibberish"
        }
      });

      expect(response.status).toBe(401);
      expect(response.data).toStrictEqual({
        success: false,
        error: "Unauthorized, token missing or invalid"
      });
    } catch (err) {

    }
  });

  it("should respond with Unauthorized when sent no token", async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/auth/me`);

      expect(response.status).toBe(400);
      expect(response.data).toStrictEqual({
        success: false,
        error: "Invalid request schema",
      });
    } catch (err) {
    }
  });


  it("should return user's information when right token is sent ", async () => {
    const response = await axios.get(`${BASE_URL}/api/auth/me`, {
      headers: {
        Authorization: token
      }
    });

    expect(response.status).toBe(200);
    expect(response.data.success).toBe(true);
    expect(response.data.data.name).toBe("nagmani");
    expect(response.data.data.email).toBe("nagmani@gmail.com");
    expect(response.data.data.role).toBe("student");
  });

});

async function loginUserAndAdmin() {
  let adminToken: any;
  let adminId: any

  let userToken: any;
  let userId: any

  const userLogin = await axios.post(`${BASE_URL}/api/auth/login`, {
    email: "nagmani@gmail.com",
    password: "password",
  });

  const userInfo = await axios.get(`${BASE_URL}/api/auth/me`, {
    headers: {
      Authorization: userLogin.data.data.token
    }
  });

  userToken = userLogin.data.data.token;
  userId = userInfo.data.data._id;


  const adminLogin = await axios.post(`${BASE_URL}/api/auth/login`, {
    email: "nagmaniadmin@gmail.com",
    password: "passwordAdmin",
  });

  const adminInfo = await axios.get(`${BASE_URL}/api/auth/me`, {
    headers: {
      Authorization: adminLogin.data.data.token
    }
  });

  adminToken = adminLogin.data.data.token;
  adminId = adminInfo.data.data._id;

  return { adminToken, adminId, userToken, userId }
}

describe("POST /api/quiz", () => {

  let adminToken: any;
  let adminId: any

  let userToken: any;
  let userId: any

  beforeAll(async () => {
    let response = await loginUserAndAdmin();
    adminId = response.adminId;
    adminToken = response.adminToken;

    userId = response.userId;
    userToken = response.userToken;
  });

  it("should fail to create quiz when wrong inputs are sent", async () => {
    try {
      const response = await axios.post(`${BASE_URL}/api/quiz`, {
        title: 23,
        questions: [{
          text: "What is Node.js?",
          options: ["Runtime", "Framework", "Library"],
          correctOptionIndex: 0
        }]
      }, {
        headers: {
          Authorization: adminToken
        }
      });

      expect(response.status).toBe(400);
      expect(response.data).toStrictEqual({
        success: false,
        error: "Invalid request schema",
      });

    } catch (err) {

    }
  });

  it("should fail to create quiz when wrong jwt is sent", async () => {
    try {
      const response = await axios.post(`${BASE_URL}/api/quiz`, {
        title: "JavaScript Quiz",
        questions: [{
          text: "What is Node.js?",
          options: ["Runtime", "Framework", "Library"],
          correctOptionIndex: 0
        }]
      }, {
        headers: {
          Authorization: "gibberish"
        }
      });

      expect(response.status).toBe(401);
      expect(response.data).toStrictEqual({
        success: false,
        error: "Unauthorized, admin access required"
      });
    } catch (err) {

    }
  });

  it("should fail to create quiz when no jwt is sent", async () => {
    try {
      const response = await axios.post(`${BASE_URL}/api/quiz`, {
        title: "JavaScript Quiz",
        questions: [{
          text: "What is Node.js?",
          options: ["Runtime", "Framework", "Library"],
          correctOptionIndex: 0
        }]
      });

      expect(response.status).toBe(401);
      expect(response.data).toStrictEqual({
        success: false,
        error: "Unauthorized, admin access required"
      });

    } catch (err) {

    }
  });

  it("should fail to create quiz when user tries to create quiz", async () => {
    try {
      const response = await axios.post(`${BASE_URL}/api/quiz`, {
        title: "JavaScript Quiz",
        questions: [{
          text: "What is Node.js?",
          options: ["Runtime", "Framework", "Library"],
          correctOptionIndex: 0
        }]
      }, {
        headers: {
          Authorization: userToken
        }
      });

      expect(response.status).toBe(401);
      expect(response.data).toStrictEqual({
        success: false,
        error: "Unauthorized, admin access required"
      });
    } catch (err) {

    }
  });


  it("should successfully create a quiz", async () => {
    const response = await axios.post(`${BASE_URL}/api/quiz`, {
      title: "JavaScript Quiz",
      questions: [{
        text: "What is Node.js?",
        options: ["Runtime", "Framework", "Library"],
        correctOptionIndex: 0
      }]
    }, {
      headers: {
        Authorization: adminToken
      }
    });
    expect(response.status).toBe(201);
    expect(response.data.data._id).toBeDefined();
    expect(response.data.data.title).toBeDefined();
  });
});



describe("POST /api/quiz/:quizId/questions", () => {

  let adminToken: any;
  let adminId: any

  let userToken: any;
  let userId: any

  let quizId: any;

  beforeAll(async () => {
    let response = await loginUserAndAdmin();
    adminId = response.adminId;
    adminToken = response.adminToken;

    userId = response.userId;
    userToken = response.userToken;

    const createQuiz = await axios.post(`${BASE_URL}/api/quiz`, {
      title: "Typescript Quiz",
      questions: [{
        text: "What is Typescript ?",
        options: ["Runtime", "Framework", "Library"],
        correctOptionIndex: 1
      }]
    }, {
      headers: {
        Authorization: adminToken
      }
    });
    quizId = createQuiz.data.data._id;
  });

  it("should fail to add questions when wrong inputs are sent", async () => {
    try {
      const response = await axios.post(`${BASE_URL}/api/${quizId}/questions`, {
        text: "What is Node.js?",
        options: 23,
        correctOptionIndex: 0
      }, {
        headers: {
          Authorization: adminToken
        }
      });
      expect(response.status).toBe(400);
      expect(response.data).toStrictEqual({
        success: false,
        error: "Invalid request schema",
      });
    } catch (err) {

    }
  });


  it("should fail to add questions when wrong jwt is sent", async () => {
    try {
      const response = await axios.post(`${BASE_URL}/api/${quizId}/questions`, {
        text: "What is Node.js?",
        options: ["Runtime", "Framework", "Library"],
        correctOptionIndex: 0
      }, {
        headers: {
          Authorization: "gibberish"
        }
      });
      expect(response.status).toBe(401);
      expect(response.data).toStrictEqual({
        success: false,
        error: "Unauthorized, admin access required"
      });
    } catch (err) {

    }
  });


  it("should fail to add questions when no jwt is sent", async () => {
    try {
      const response = await axios.post(`${BASE_URL}/api/${quizId}/questions`, {
        text: "What is Node.js?",
        options: ["Runtime", "Framework", "Library"],
        correctOptionIndex: 0
      },);
      expect(response.status).toBe(401);
      expect(response.data).toStrictEqual({
        success: false,
        error: "Unauthorized, admin access required"
      });

    } catch (err) {

    }

  });

  it("should fail to add questions when student tries to create quiz", async () => {
    try {
      const response = await axios.post(`${BASE_URL}/api/${quizId}/questions`, {
        text: "What is Node.js?",
        options: ["Runtime", "Framework", "Library"],
        correctOptionIndex: 0
      }, {
        headers: {
          Authorization: userToken
        }
      });
      expect(response.status).toBe(401);
      expect(response.data).toStrictEqual({
        success: false,
        error: "Unauthorized, admin access required"
      });
    } catch (err) {

    }

  });

  it("should add questions when everything is rignt", async () => {
    try {
      const response = await axios.post(`${BASE_URL}/api/${quizId}/questions`, {
        text: "What is bun.js?",
        options: ["library", "React", "Turborepo"],
        correctOptionIndex: 2
      }, {
        headers: {
          Authorization: adminToken
        }
      });
      console.log(quizId);
      console.log(response.data);

      expect(response.status).toBe(200);
      expect(response.data.success).toBe(true);
      expect(response.data.data.quizId).toBeDefined();
      expect(response.data.data.question._id).toBeDefined();
      expect(response.data.data.question.text).toBe("What is bun.js?");
      expect(response.data.data.question.options).toBeDefined();
      expect(response.data.data.question.correctOptionIndex).toBe(2);
    } catch (err) {

    }
  });
});

describe("GET /api/quiz/:quizId", () => {
  let adminToken: any;
  let adminId: any

  let userToken: any;
  let userId: any

  let quizId: any;

  beforeAll(async () => {
    let response = await loginUserAndAdmin();
    adminId = response.adminId;
    adminToken = response.adminToken;

    userId = response.userId;
    userToken = response.userToken;

    const createQuiz = await axios.post(`${BASE_URL}/api/quiz`, {
      title: "Rust Quiz",
      questions: [{
        text: "What is Rust ?",
        options: ["Language", "javascript", "node js "],
        correctOptionIndex: 0
      }]
    }, {
      headers: {
        Authorization: adminToken
      }
    });
    quizId = createQuiz.data.data._id;
  });

  it("should fail to get quiz when wrong jwt is sent", async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/quiz/${quizId}`, {
        headers: {
          Authorization: "gibberish"
        }
      });

      expect(response.status).toBe(401);
      expect(response.data).toStrictEqual({
        success: false,
        error: "Unauthorized, token missing or invalid"
      });
    } catch (err) {

    }
  });

  it("should fail to get quiz when no jwt is sent", async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/quiz/${quizId}`);

      expect(response.status).toBe(401);
      expect(response.data).toStrictEqual({
        success: false,
        error: "Unauthorized, token missing or invalid"
      });

    } catch (err) {
    }
  });

  it("should fail with 404 when trying to get a quiz which does not exits", async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/quiz/gibberish`, {
        headers: {
          Authorization: adminToken
        }
      });

      expect(response.status).toBe(404);
      expect(response.data).toStrictEqual({
        success: false,
        error: "Quiz not found"
      });

    } catch (err) {
    }
  });

  it("should fail when a student tries to fetch the quiz", async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/quiz/${quizId}`, {
        headers: {
          Authorization: userToken
        }
      });

      expect(response.status).toBe(401);
      expect(response.data).toStrictEqual({
        success: false,
        error: "Unauthorized, token missing or invalid"
      });
    } catch (err) {

    }

  });

  it("shold get a quiz with all its questions", async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/quiz/${quizId}`, {
        headers: {
          Authorization: adminToken
        }
      });
      expect(response.status).toBe(200);
      expect(response.data.data._id).toBeDefined();
      expect(response.data.data.title).toBeDefined();
      expect(response.data.data.questions).toBeDefined();
    } catch (err) {
    }

  });
});

