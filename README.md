# IP Tracker

A modern, responsive web application that tracks and displays detailed information about IP addresses. Built with React, TypeScript, and Vite, this application provides comprehensive IP geolocation data with an interactive map interface.

## 🌟 Features

- **Real-time IP Tracking**: Automatically detects and displays your current IP address
- **Interactive Map**: Visual representation of IP location using Leaflet maps
- **Comprehensive Data**: Detailed information including:
  - Geographic location (continent, country, region, city)
  - Network information (ISP, ASN)
  - Timezone and currency details
  - Country-specific data (population, capital, flag)
- **PDF Export**: Download IP information as a formatted PDF document
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Dark/Light Theme**: Toggle between themes for better user experience
- **Modern UI**: Built with Tailwind CSS and shadcn/ui components

## 🚀 Technologies Used

- **Frontend**: React 19, TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui, Radix UI
- **Maps**: React Leaflet, OpenStreetMap
- **PDF Generation**: @react-pdf/renderer
- **HTTP Client**: Axios
- **Package Manager**: pnpm

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Gaurav-461/ip-tracker.git
   cd ip-tracker
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Start the development server**
   ```bash
   pnpm dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🛠️ Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint

## 📱 Usage

1. **Automatic Detection**: The app automatically detects and displays your current IP address information
2. **Interactive Map**: View your location on the interactive map
3. **Detailed Information**: 
   - **General Tab**: Basic location and country information
   - **Details Tab**: Comprehensive network and geographic data
   - **Download Tab**: Export information as PDF
4. **Theme Toggle**: Switch between light and dark themes using the theme toggle

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # Reusable UI components
│   ├── Input.tsx       # IP input component
│   ├── ContentBox.tsx  # Main content display
│   └── CreatePDF.tsx   # PDF generation component
├── types/              # TypeScript type definitions
├── context/            # React context providers
├── lib/                # Utility functions
└── data/               # Static data files
```

## 🔧 Configuration

The application uses several external APIs:
- **IP Geolocation**: ipapi.co for IP address information
- **Country Data**: restcountries.com for detailed country information
- **Maps**: OpenStreetMap for map tiles
