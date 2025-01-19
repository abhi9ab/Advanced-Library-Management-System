import { Request, Response } from "express"

export const mockRequest = {
    body: 
    {
        "name": "abhinab",
        "email": "abhinabdas004@gmail.com",
        "password": "password"
    }
} as Request;

export const mockResponse = {
    json: jest.fn(),
    status: jest.fn(() => mockResponse)
} as unknown as Response;