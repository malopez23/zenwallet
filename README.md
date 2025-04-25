# ZenWallet - Personal Finance Manager

## 📋 Overview

**ZenWallet** is a simple and intuitive web application for managing personal finances. It allows users to track their income and expenses, view financial summaries by month, and monitor spending by category through interactive charts. The goal is to help users keep their finances organized in a practical and visually appealing way.

### Key Features
- **Transaction Tracking**: Add, edit, and delete transactions (income and expenses) with date, description, category, and amount.
- **Fixed Monthly Income**: Set a fixed monthly income for balance calculations.
- **Monthly Filtering**: View transactions and financial summaries for a specific month.
- **Visual Charts**: Income and expense summaries in Doughnut Charts with custom colors.
- **Financial Summary**: See your total income, expenses, and balance in informative cards.
- **Data Persistence**: Data is saved in `localStorage` to persist across page reloads.
- **Clear All**: A button to reset all transactions and monthly income with a confirmation prompt.
- **Responsive Design**: Interface adaptable for both mobile and desktop devices.

---

## 🚀 How to Run the Project

### Prerequisites
Before you begin, ensure you have the following installed:
- **Node.js** (version 16 or higher) - [Download](https://nodejs.org/)
- **npm** (usually installed with Node.js)

### Installation Steps
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/malopez23/zenwallet.git
   cd zenwallet
   ```

2. **Install Dependencies**:
   Run the following command to install all dependencies listed in `package.json`:
   ```bash
   npm install
   ```

3. **Start the Development Server**:
   The project uses Vite as the bundler. To start the development server, run:
   ```bash
   npm run dev
   ```

4. **Access the Application**:
   Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

   You’ll see the ZenWallet interface ready to use!

---

## 🖥️ How to Use ZenWallet

### 1. **Set Monthly Income**
- In the sidebar (on the left), in the "Monthly Income" field, enter your fixed monthly income (e.g., `5000`).
- Click "Save" to register the income. It will be used to calculate your monthly balance.

### 2. **Select the Month**
- In the sidebar, use the "Month" dropdown to select the month you want to view (e.g., "March").
- Transactions, charts, and summaries will be filtered for the selected month.

### 3. **Add a Transaction**
- Click the "+ New Transaction" button in the top right corner of the dashboard.
- Fill out the form:
  - **Date**: Select the transaction date (default: current date).
  - **Description**: A brief description (e.g., "Groceries").
  - **Category**: Choose a category (e.g., "food").
  - **Type**: Select "Income" or "Expense".
  - **Amount**: Enter the amount (e.g., `300`).
- Click "Add" to save the transaction.

### 4. **Edit or Delete Transactions**
- In the transactions table, click "Edit" to modify an existing transaction or "Delete" to remove it.

### 5. **View Summaries**
- **Summary Cards**: See your total income, expenses, and balance at the top of the dashboard.
- **Income Chart**: Shows the proportion between fixed monthly income and additional income.
- **Expense Chart**: Displays expenses broken down by category.

### 6. **Clear All**
- To reset all transactions and monthly income, click the "Clear All" button in the header.
- A confirmation prompt will appear to prevent accidental deletions.

---

## 🛠️ Technologies Used

- **React**: JavaScript library for building user interfaces.
- **Vite**: Fast build tool and development server.
- **Tailwind CSS**: CSS framework for styling.
- **Chart.js** and **react-chartjs-2**: For creating Doughnut Charts.
- **localStorage**: For data persistence in the browser.

---

## 🔍 Technical Details

### Data Persistence
- Transactions and fixed monthly income are saved in `localStorage` using the following keys:
  - `zenwallet_transactions`: List of transactions.
  - `zenwallet_monthlyIncome`: Fixed monthly income.
- Data persists across page reloads but is local to the user’s browser.

### Charts
- **Income Chart**: Shows the proportion between fixed monthly income and additional income.
- **Expense Chart**: Displays expenses grouped by category, with custom colors for each category:
  - Food: Pastel red (`#FECACA`)
  - Transportation: Darker pastel blue (`#60A5FA`)
  - Leisure: Pastel blue (`#BFDBFE`)
  - Health: Pastel pink (`#FBCFE8`)
  - Others: Darker pastel purple (`#C4B5FD`)
  - Housing: Pastel purple (`#DDD6FE`)
  - Education: Light pastel green (`#BBF7D0`)
  - Clothing: Light pastel pink (`#F9A8D4`)
  - Travel: Pastel orange (`#FED7AA`)
  - Investments: Pastel cyan (`#A5F3FC`)
  - Donations: Light gray (`#D4D4D4`)

### Table Styling
- The transactions table has subtle backgrounds for:
  - **Values**: Light green (`bg-green-100`) for income and light red (`bg-red-100`) for expenses.
  - **Categories**: Same colors as the expense chart, for visual consistency.

---

## 🤝 How to Contribute

Want to contribute to ZenWallet? Follow these steps:

1. **Fork the Repository**:
   Click the "Fork" button on GitHub to create a copy of the repository in your account.

2. **Clone Your Fork**:
   ```bash
   git clone https://github.com/your-username/zenwallet.git
   ```

3. **Create a Branch**:
   ```bash
   git checkout -b my-new-feature
   ```

4. **Make Your Changes**:
   Implement your improvements or fixes in the code.

5. **Commit and Push Your Changes**:
   ```bash
   git add .
   git commit -m "Add my new feature"
   git push origin my-new-feature
   ```

6. **Create a Pull Request**:
   On GitHub, create a Pull Request to the original repository. Describe your changes in detail.

---

## 📝 Additional Notes

- **Limitations**:
  - ZenWallet currently does not support multiple years; transactions are filtered only by month, regardless of the year.
  - There is no user authentication, and data is stored locally in the browser.

- **Potential Future Improvements**:
  - Add support for filtering by year.
  - Implement user authentication and backend synchronization.
  - Add data export functionality (e.g., CSV).
  - Include advanced filters in the transactions table.

---

## 📧 Contact

If you have questions, suggestions, or issues, feel free to reach out:
- **Email**: malopez/rodriguez23@gmail.com
- **GitHub Issues**: Open an issue in the repository [here](https://github.com/username/zenwallet/issues)

---

## 🌟 Acknowledgments

Thank you for using ZenWallet! This project was created to simplify personal finance management. I hope it’s helpful to you! 😊