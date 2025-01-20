# Stock Swap Simulator

To run the project type:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Project Structure

The project is organized into several key folders and components:

### Constants

Two main tables are defined as constants in the constants folder:

- **User Balances**: Tracks the amount of available currencies users can trade.
- **Rates**: Specifies the exchange rates for trading.

The constants are exported to the store (stores/userBalances), where core stock exchange functions are implemented. These functions are further exported for use in the form.

## Example of Rates:

**Rates are expressed relative to MDS as the base currency.**

```javascript
const RATES = [
  { id: "AAPL", rate: 30 },
  { id: "TSLA", rate: 45 },
  { id: "AMZN", rate: 60 },
  { id: "MDS", rate: 1 },
];
```

### Components

The components folder includes three main components, that are implemented via **+page.svelte**:

**1. Swap Form**

- Handles the currency trading process.
- Imports necessary functions from the store.
- Prevents trading one currency for the same currency (e.g., MDS to MDS).
- Validates the input:
  - Disallows negative numbers.
  - Ensures the amount entered is less than or equal to the available balance.
- Includes a Swap Button with color signals:
  - Green: Transaction is valid.
  - Red: Transaction is invalid.

**2. Current Balance**

- Displays the available amount of each currency for the user.

**3. Holders Balance**

- Displays the balance of currency holders.

### Utilities

The utils folder includes a stringFormatter function used for formatting numbers to two decimal places.

### Static Assets

The static folder contains logos used for designing the title and header.

### Styling

This project uses Tailwind CSS for styling.
