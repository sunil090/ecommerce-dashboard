// src/utils/pagination.js

function getPagination(query) {
  const page = Math.max(Number.parseInt(query.page || "1", 10), 1)
  const limit = Math.min(Math.max(Number.parseInt(query.limit || "10", 10), 1), 100)
  const offset = (page - 1) * limit
  return { page, limit, offset }
}

function paginatedResponse({ rows, count }, page, limit) {
  const totalPages = Math.ceil(count / limit)
  return {
    success: true,
    message: "OK",
    data: rows,
    meta: { page, limit, total: count, totalPages },
  }
}

module.exports = { getPagination, paginatedResponse }
