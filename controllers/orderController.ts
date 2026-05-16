import { Request, Response } from "express";

export async function getAllOrders(req: Request, res: Response) {
  res.send("getAllOrders");
}
export async function getSingleOrder(req: Request, res: Response) {
  res.send("getSingleOrder");
}
export async function getCurrentUserOrders(req: Request, res: Response) {
  res.send("getCurrentUserOrders");
}
export async function createOrder(req: Request, res: Response) {
  res.send("createOrder");
}
export async function updateOrder(req: Request, res: Response) {
  res.send("updateOrder");
}
