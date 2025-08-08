import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'

type Todo = {
  id: string
  title: string
  completed: boolean
  createdAt: string
  updatedAt: string
}

// インメモリストレージ（シンプルに始める）
const todos: Map<string, Todo> = new Map()

const app = new Hono()

// CORS設定
app.use('/*', cors())

// ヘルスチェック
app.get('/', (c) => {
  return c.json({
    message: 'Todo API with Hono - Created by Claude MCP 🚀',
    version: '1.0.0',
    endpoints: [
      'GET    /todos        - 全Todo取得',
      'GET    /todos/:id    - 特定Todo取得',
      'POST   /todos        - Todo作成',
      'PUT    /todos/:id    - Todo更新',
      'PATCH  /todos/:id    - Todo部分更新',
      'DELETE /todos/:id    - Todo削除'
    ]
  })
})

// 全Todo取得
app.get('/todos', (c) => {
  const todoList = Array.from(todos.values())
  return c.json({
    count: todoList.length,
    todos: todoList
  })
})

// 特定Todo取得
app.get('/todos/:id', (c) => {
  const id = c.req.param('id')
  const todo = todos.get(id)
  
  if (!todo) {
    return c.json({ error: 'Todo not found' }, 404)
  }
  
  return c.json(todo)
})

// Todo作成
app.post('/todos', async (c) => {
  try {
    const body = await c.req.json<{ title: string }>()
    
    if (!body.title || body.title.trim() === '') {
      return c.json({ error: 'Title is required' }, 400)
    }
    
    const id = crypto.randomUUID()
    const now = new Date().toISOString()
    
    const newTodo: Todo = {
      id,
      title: body.title,
      completed: false,
      createdAt: now,
      updatedAt: now
    }
    
    todos.set(id, newTodo)
    
    return c.json(newTodo, 201)
  } catch (error) {
    return c.json({ error: 'Invalid request body' }, 400)
  }
})

// Todo完全更新
app.put('/todos/:id', async (c) => {
  const id = c.req.param('id')
  const todo = todos.get(id)
  
  if (!todo) {
    return c.json({ error: 'Todo not found' }, 404)
  }
  
  try {
    const body = await c.req.json<{ title: string; completed: boolean }>()
    
    if (!body.title || body.title.trim() === '') {
      return c.json({ error: 'Title is required' }, 400)
    }
    
    const updatedTodo: Todo = {
      ...todo,
      title: body.title,
      completed: body.completed ?? false,
      updatedAt: new Date().toISOString()
    }
    
    todos.set(id, updatedTodo)
    
    return c.json(updatedTodo)
  } catch (error) {
    return c.json({ error: 'Invalid request body' }, 400)
  }
})

// Todo部分更新（completedのトグルとか）
app.patch('/todos/:id', async (c) => {
  const id = c.req.param('id')
  const todo = todos.get(id)
  
  if (!todo) {
    return c.json({ error: 'Todo not found' }, 404)
  }
  
  try {
    const body = await c.req.json<Partial<{ title: string; completed: boolean }>>()
    
    const updatedTodo: Todo = {
      ...todo,
      ...(body.title !== undefined && { title: body.title }),
      ...(body.completed !== undefined && { completed: body.completed }),
      updatedAt: new Date().toISOString()
    }
    
    todos.set(id, updatedTodo)
    
    return c.json(updatedTodo)
  } catch (error) {
    return c.json({ error: 'Invalid request body' }, 400)
  }
})

// Todo削除
app.delete('/todos/:id', (c) => {
  const id = c.req.param('id')
  const todo = todos.get(id)
  
  if (!todo) {
    return c.json({ error: 'Todo not found' }, 404)
  }
  
  todos.delete(id)
  
  return c.json({ message: 'Todo deleted successfully', deleted: todo })
})

// サーバー起動
const port = 3000
console.log(`🚀 Todo API Server is running on http://localhost:${port}`)
console.log('📝 Created with Claude MCP + GitHub Integration')
console.log('👨‍💻 Author: まさかず (MAA39)\n')

serve({
  fetch: app.fetch,
  port
})