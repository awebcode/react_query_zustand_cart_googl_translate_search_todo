import express, { Request, Response } from "express";
const app = express();
import jsonData from "./data.json";
const port = 4000;
import cors from "cors";
import { uuid } from "uuidv4";
app.use(cors());

app.use(express.json());
app.get("/", async (req: Request, res: Response) => {
  try {
    // Extract limit and skip from the query parameters
    const limit = parseInt(req.query.limit as string) || 100;
    const skip = parseInt(req.query.skip as string) || 0;
    console.log({ skip, limit });
    // Call the fethQueryData function with the provided limit and skip
    const response = await fetch(
      `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
    );
    const { ...restData } = await response.json();
    // Extract the desired range of data based on limit and skip

    // Create an object with both slicedData and restData
    const responseData = {
      length: jsonData.products.slice(skip, skip + limit).length,
      products: jsonData.products.slice(skip, skip + limit),

      ...restData,
    };

    // Send the object as JSON response
    res.json(responseData);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
type Tarr = {
  id: string;
  title: string;
  description: string;
};
let arr: Tarr[] = [];
app.post("/post", async (req: Request, res: Response) => {
  const { title = "", description } = req.body;
  const data = { id: uuid(), title, description };
  arr.push(data);
  console.log(req.body);
  res.json({ todo: arr, total: arr.length });
});
app.get("/get", async (req: Request, res: Response) => {
  const limit = parseInt(req.query.limit as string) || 100;
  const skip = parseInt(req.query.skip as string) || 0;
  const slicedTodo = arr.slice(skip, limit + skip);
  console.log(arr)
  res.json({ todos: slicedTodo, total: arr.length });
});
app.get("/single/:id", async (req: Request, res: Response) => {
  const filteredData = arr.find((_, i) => _.id === String(req.params.id));
  res.json({ todo: filteredData });
});
app.delete("/delete/:id", async (req: Request, res: Response) => {
  const deletedData = arr.filter((_, i) => _.id === String(req.params.id));

  arr = deletedData;
  res.json({ todos: arr, total: arr.length });
});

app.patch("/update/:id", async (req: Request, res: Response) => {
  const { title = "", description } = req.body;
  const updatedTodos = arr.map((todo, i) =>
    todo.id === String(req.params.id) ? { ...todo, title, description } : todo
  );
  console.log(updatedTodos);
  arr = updatedTodos;
  res.json({ todo: arr, total: arr.length });
});
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
