export default function Journal() {
  const headers = [
    "Date",
    "Symbol",
    "Market Bias",
    "Setup/Strategy",
    "Option Type",
    "Strike",
    "Entry(size@price)",
    "Stop(Risk Mgmt ~0.5*)",
    "Target(1.5R)",
    "Outcome",
    "Rule Adherence(%)",
    "Entry Quality(fit setup?)",
    "Emotional State",
    "Why this trade?",
    "Chart Screenshot",
  ];
  const listHeaders = headers.map((header) => {
    return (
      <th scope="col" className="px-6 py-4">
        {header}
      </th>
    );
  });
  return (
    <div id="Journal" className="place-items-center">
      <h1>DayTrading Journal</h1>
      <div>
        <img
          className="rounded-lg rounded-md rounded-sm rounded-xl"
          src="https://i.imgur.com/jA8hHMpm.jpg"
          alt="Katsuko Saruhashi"
        />
      </div>
      {/* <!-- Table responsive wrapper --> */}
      <div className="mt-15 overflow-x-auto bg-white dark:bg-neutral-700 rounded-lg rounded-md rounded-sm rounded-xl">
        {/* <!-- Table --> */}
        <table className="min-w-full text-left text-sm whitespace-nowrap">
          {/* <!-- Table head --> */}
          <thead className="uppercase tracking-wider border-b-2 dark:border-neutral-600">
            <tr>{listHeaders}</tr>
          </thead>

          {/* <!-- Table body --> */}
          <tbody>
            <tr className="border-b dark:border-neutral-600">
              <th scope="row" className="px-6 py-4">
                Handbag
              </th>
              <td className="px-6 py-4">$129.99</td>
              <td className="px-6 py-4">30</td>
              <td className="px-6 py-4">In Stock</td>
            </tr>

            <tr className="border-b dark:border-neutral-600">
              <th scope="row" className="px-6 py-4">
                Shoes
              </th>
              <td className="px-6 py-4">$89.50</td>
              <td className="px-6 py-4">25</td>
              <td className="px-6 py-4">In Stock</td>
            </tr>

            <tr className="border-b dark:border-neutral-600">
              <th scope="row" className="px-6 py-4">
                Bedding Set
              </th>
              <td className="px-6 py-4">$69.99</td>
              <td className="px-6 py-4">40</td>
              <td className="px-6 py-4">In Stock</td>
            </tr>

            <tr className="border-b dark:border-neutral-600">
              <th scope="row" className="px-6 py-4">
                Dining Table
              </th>
              <td className="px-6 py-4">$449.99</td>
              <td className="px-6 py-4">5</td>
              <td className="px-6 py-4">In Stock</td>
            </tr>

            <tr className="border-b dark:border-neutral-600">
              <th scope="row" className="px-6 py-4">
                Soap Set
              </th>
              <td className="px-6 py-4">$24.95</td>
              <td className="px-6 py-4">50</td>
              <td className="px-6 py-4">In Stock</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
