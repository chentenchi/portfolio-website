
import { useEffect, useState } from 'react'
import Papa from 'papaparse'
import {
  LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts'
import './GroceryDashboard.css'

const money = (value) =>
  Number(value).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'
  })

const formatDate = (date) =>
  new Date(`${date}T12:00:00`).toLocaleDateString(
    'en-US',
    { month: 'short', day: 'numeric' }
  )

function GroceryDashboard() {
  const [rows, setRows] = useState([])
  const [selectedId, setSelectedId] = useState('')
  const [dateRange, setDateRange] = useState('all')
  const [compareId, setCompareId] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}data/price_history.csv`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Could not load grocery data.')
        }
        return response.text()
      })
      .then((csv) => {
        const result = Papa.parse(csv, {
          header: true,
          skipEmptyLines: true
        })

        const cleaned = result.data
          .filter((row) =>
            row.snapshot_date &&
            row.product_id &&
            row.effective_price !== ''
          )
          .map((row) => ({
            ...row,
            effective_price: Number(row.effective_price),
            regular_price: Number(row.regular_price),
            on_sale: row.on_sale?.trim().toLowerCase() === 'true'
          }))
          .filter((row) => Number.isFinite(row.effective_price))

        if (cleaned.length === 0) {
          throw new Error('No valid price observations found.')
        }

        setRows(cleaned)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <section className="section">
        <p>Loading grocery data...</p>
      </section>
    )
  }

  if (error) {
    return (
      <section className="section">
        <p role="alert">{error}</p>
      </section>
    )
  }

  // Find the latest date recorded in the dataset.
  const latestDate = rows.reduce(
    (latest, row) =>
      row.snapshot_date > latest ? row.snapshot_date : latest,
    ''
  )

  const latestRows = rows.filter(
    (row) => row.snapshot_date === latestDate
  )

  // Calculate the cost of one package of each tracked product.
  const basketCost = latestRows.reduce(
    (total, row) => total + row.effective_price,
    0
  )

  const itemsOnSale = latestRows.filter(
    (row) => row.on_sale
  ).length

  // Build the product selector.
  const products = [...latestRows].sort(
    (a, b) => a.product_name.localeCompare(b.product_name)
  )

  const defaultProduct =
    products.find((row) => row.category === 'Chicken Breast') ??
    products[0]

  const selectedProduct =
    products.find((row) => row.product_id === selectedId) ??
    defaultProduct

  const priceHistory = rows
    .filter((row) => row.product_id === selectedProduct.product_id)
    .sort((a, b) =>
      a.snapshot_date.localeCompare(b.snapshot_date)
    )
    .map((row) => ({
      date: row.snapshot_date,
      price: row.effective_price
    }))
let visibleHistory = priceHistory

if (dateRange !== 'all' && priceHistory.length > 0) {
  const latest = new Date(
    `${priceHistory[priceHistory.length - 1].date}T00:00:00Z`
  )

  latest.setUTCDate(
    latest.getUTCDate() - (Number(dateRange) - 1)
  )

  const cutoff = latest.toISOString().slice(0, 10)

  visibleHistory = priceHistory.filter(
    (row) => row.date >= cutoff
  )
}

const comparisonHistory = compareId
  ? rows
      .filter((row) => row.product_id === compareId)
      .sort((a, b) =>
        a.snapshot_date.localeCompare(b.snapshot_date)
      )
      .map((row) => ({
        date: row.snapshot_date,
        comparePrice: row.effective_price
      }))
  : []

const combinedHistory = [
  ...new Set([
    ...priceHistory.map((row) => row.date),
    ...comparisonHistory.map((row) => row.date)
  ])
]
  .sort()
  .map((date) => ({
    date,
    price: priceHistory.find(
      (row) => row.date === date
    )?.price,
    comparePrice: comparisonHistory.find(
      (row) => row.date === date
    )?.comparePrice
  }))

let visibleCombinedHistory = combinedHistory

if (dateRange !== 'all' && priceHistory.length > 0) {
  const latest = new Date(
    `${priceHistory[priceHistory.length - 1].date}T00:00:00Z`
  )

  latest.setUTCDate(
    latest.getUTCDate() - (Number(dateRange) - 1)
  )

  const cutoff = latest.toISOString().slice(0, 10)

  visibleCombinedHistory = combinedHistory.filter(
    (row) => row.date >= cutoff
  )
}
  return (
    <section id="grocery-dashboard" className="section grocery-dashboard">
      <p className="eyebrow">INTERACTIVE ANALYTICS</p>
      <h2>Grocery Price Tracker</h2>
      <p className="dashboard-description">
        Explore historical grocery prices collected through my
        automated Python data pipeline.
      </p>

      <p className="dashboard-date">
        Latest recorded observation: {formatDate(latestDate)}
      </p>

      <div className="dashboard-kpis">
        <div className="dashboard-kpi">
          <span>Recorded basket cost</span>
          <strong>{money(basketCost)}</strong>
          <small>{latestRows.length} tracked products</small>
        </div>

        <div className="dashboard-kpi">
          <span>Products on sale</span>
          <strong>{itemsOnSale}</strong>
          <small>On the latest recorded date</small>
        </div>
      </div>

      <div className="dashboard-chart">
        <div className="dashboard-chart-header">
          <div>
            <h3>Product price history</h3>
            <p>Choose a product to explore its price changes.</p>
          </div>

          <div className="product-selector">
            <label htmlFor="grocery-product">Product</label>
            <select
              id="grocery-product"
              value={selectedProduct.product_id}
              onChange={(event) =>
                setSelectedId(event.target.value)
              }
            >
              {products.map((product) => (
                <option
                  key={product.product_id}
                  value={product.product_id}
                >
                  {product.product_name}
                </option>
              ))}
            </select>
          </div>
        </div>

<div className="product-selector">
  <label htmlFor="grocery-range">Date range</label>
  <select
    id="grocery-range"
    value={dateRange}
    onChange={(event) => setDateRange(event.target.value)}
  >
    <option value="all">All data</option>
    <option value="14">Last 14 days</option>
    <option value="7">Last 7 days</option>
  </select>
</div>

<div className="product-selector">
  <label htmlFor="grocery-compare">
    Compare with (optional)
  </label>
  <select
    id="grocery-compare"
    value={compareId}
    onChange={(event) => setCompareId(event.target.value)}
  >
    <option value="">No comparison</option>
    {products
      .filter(
        (product) =>
          product.product_id !== selectedProduct.product_id
      )
      .map((product) => (
        <option
          key={product.product_id}
          value={product.product_id}
        >
          {product.product_name}
        </option>
      ))}
  </select>
</div>
        <div className="selected-price">
          <span>Latest recorded price</span>
          <strong>{money(selectedProduct.effective_price)}</strong>
          <span>{selectedProduct.package_size}</span>
          {selectedProduct.on_sale && (
            <span className="sale-label">On sale</span>
          )}
        </div>

        <div className="grocery-chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={visibleCombinedHistory}>
              <CartesianGrid
                stroke="#334155"
                strokeDasharray="3 3"
              />

              <XAxis
                dataKey="date"
                tickFormatter={formatDate}
                stroke="#94a3b8"
                minTickGap={25}
              />

              <YAxis
                tickFormatter={money}
                stroke="#94a3b8"
                width={65}
                domain={[0, 'auto']}
              />

              <Tooltip
                 labelFormatter={formatDate}
  formatter={(value, name) => [
    money(value),
    name
  ]}
              />
<Legend
  position="bottom"
  height={40}
/>
              <Line
                type="linear"
                dataKey="price"
                name={selectedProduct.product_name}
                stroke="#22d3ee"
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 5 }}
              />

{compareId && (
  <Line
    type="linear"
    dataKey="comparePrice"
name={
  products.find(
    (product) => product.product_id === compareId
  )?.product_name ?? 'Comparison product'
}
    stroke="#f59e0b"
    strokeWidth={3}
    dot={false}
    activeDot={{ r: 5 }}
    connectNulls={false}
  />
)}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <p className="dashboard-note">
        Basket cost assumes one package of each tracked product.
        Prices represent historical observations from one
        Kroger location, not live store prices.
      </p>
    </section>
  )
}

export default GroceryDashboard