import { Request, Response } from "express";
import { registerController, loginController } from "../../controllers/auth.controller";
import { register, login } from "../../services/auth.service";
import { mockRequest, mockResponse } from "../../__mocks__";
import { userSchema, loginSchema } from "../../models/validators";

jest.mock("../../models/validators", () => ({
    userSchema: jest.fn(() => ({
        parse: jest.fn(() => ({
            name: "abhinab",
            email: "example@gmail.com",
            password: "123"
        }))
    })),
    loginSchema: jest.fn(() => ({
        parse: jest.fn(() => ({
            email: "example@gmail.com",
            password: "123"
        }))
    }))
}))

describe("registerController", () => {
    it("should register user", async () => {
        await registerController(mockRequest, mockResponse); 
        expect(userSchema).toHaveBeenCalled();
        expect(mockResponse.status).toHaveBeenCalled();
        expect(mockResponse.status).toHaveBeenCalledWith(201);
    })
})

describe("loginController", () => {
    const mockRequest = {
        "email": "abhinabdas004@gmail.com",
        "password": "123"
    } as unknown as Request

    it("should login user", async () => {
        loginController(mockRequest, mockResponse);
        expect(loginSchema).toHaveBeenCalled();
        expect(mockResponse.json).toHaveBeenCalled();
    })
})
