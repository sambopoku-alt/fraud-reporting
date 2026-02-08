# API Documentation

## Overview
This document provides comprehensive documentation for all API endpoints in the Fraud Reporting system.

## Endpoints

### POST /reports
- **Description**: Creates a new report.
- **Request Body**:
  - `title`: The title of the report (string).
  - `description`: The description of the report (string).
  - `userId`: The ID of the user reporting (integer).
- **Response**:
  - **201 Created**: Returns the created report object.
  - **400 Bad Request**: Returned if required fields are missing.

### GET /reports
- **Description**: Retrieves all reports.
- **Response**:
  - **200 OK**: Returns an array of report objects.

### GET /search
- **Description**: Searches for reports based on query parameters.
- **Query Parameters**:
  - `title`: Title of the report to search for (string).
- **Response**:
  - **200 OK**: Returns an array of matching reports.

### PATCH /reports/:id
- **Description**: Updates an existing report.
- **Path Parameters**:
  - `id`: The ID of the report to update.
- **Request Body**:
  - `title`: Updated title of the report (string).
  - `description`: Updated description of the report (string).
- **Response**:
  - **200 OK**: Returns the updated report object.
  - **404 Not Found**: Returned if the report does not exist.

### DELETE /reports/:id
- **Description**: Deletes a report by ID.
- **Path Parameters**:
  - `id`: The ID of the report to delete.
- **Response**:
  - **204 No Content**: Report deleted successfully.
  - **404 Not Found**: Returned if the report does not exist.

### GET /statistics
- **Description**: Retrieves statistics about reports.
- **Response**:
  - **200 OK**: Returns statistics object.

## Error Responses
- **400 Bad Request**: Indicates a problem with the request.
- **404 Not Found**: The requested resource does not exist.
- **500 Internal Server Error**: An unexpected error occurred.

## Rate Limiting
- Maximum of 100 requests per hour per user.

## Filtering Examples
- To filter reports by title, include `?title=example` in your request.

## cURL Request Examples
### Create Report
```bash
curl -X POST http://api.example.com/reports \
-H "Content-Type: application/json" \
-d '{"title": "New Report", "description": "Report Description", "userId": 1}'
```

### Get All Reports
```bash
curl -X GET http://api.example.com/reports
```

### Search Reports
```bash
curl -X GET "http://api.example.com/search?title=example"
```

### Update Report
```bash
curl -X PATCH http://api.example.com/reports/1 \
-H "Content-Type: application/json" \
-d '{"title": "Updated Title", "description": "Updated Description"}'
```

### Delete Report
```bash
curl -X DELETE http://api.example.com/reports/1
```

### Get Statistics
```bash
curl -X GET http://api.example.com/statistics
```
