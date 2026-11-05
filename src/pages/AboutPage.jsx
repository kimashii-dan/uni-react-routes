import '../styles/AboutPage.css'

function AboutPage() {
  return (
    <section className="panel about">
      <h1 className="page-title">About the project</h1>
      <p>
        Product Catalog is a small React app built to practice routing and application architecture. It uses the public
        DummyJSON API as its data source.
      </p>
      <h2>Built with</h2>
      <ul>
        <li>React and Vite</li>
        <li>React Router with nested routes and lazy-loaded pages</li>
        <li>Plain CSS with shared design tokens</li>
      </ul>
      <h2>Features</h2>
      <ul>
        <li>Product list with search, category and availability filters, sorting and pagination</li>
        <li>Filters stored in the URL, so links and refreshes keep the same view</li>
        <li>Product details page for every item</li>
        <li>Dashboard with statistics and breakdowns calculated from API data</li>
      </ul>
    </section>
  )
}

export default AboutPage
