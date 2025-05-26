#!/bin/bash

echo "=== Testing Book Inventory API ==="

echo -e "\n1. Get all books"
curl -X GET http://localhost:3000/api/books

echo -e "\n\n2. Get book by ID"
curl -X GET http://localhost:3000/api/books/1

echo -e "\n\n3. Create a new book"
curl -X POST http://localhost:3000/api/books \
  -H "Content-Type: application/json" \
  -d '{"title": "The Hobbit", "author": "J.R.R. Tolkien", "year": 1937, "inStock": true}'

echo -e "\n\n4. Update a book"
curl -X PUT http://localhost:3000/api/books/1 \
  -H "Content-Type: application/json" \
  -d '{"title": "The Great Gatsby", "author": "F. Scott Fitzgerald", "year": 1925, "inStock": false}'

echo -e "\n\n5. Delete a book"
curl -X DELETE http://localhost:3000/api/books/2

echo -e "\n\n6. Search books by title or author"
curl -X GET "http://localhost:3000/api/books/search/query?q=Gatsby"

echo -e "\n\n7. Get all out-of-stock books"
curl -X GET http://localhost:3000/api/books/stock/out

echo -e "\n\n8. Update book stock status"
curl -X PATCH http://localhost:3000/api/books/1/stock \
  -H "Content-Type: application/json" \
  -d '{"inStock": true}'

echo -e "\n\n=== Testing complete ==="
