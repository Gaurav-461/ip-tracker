import { Page, Text, View, Document, StyleSheet, Font } from "@react-pdf/renderer";
import type { IPInfo, CountryInfo } from "../types/ApiResponse";

interface MyDocumentProps {
  content: IPInfo;
  country: CountryInfo;
}

// Create Document Component
const MyDocument = ({ content, country }: MyDocumentProps) => (
  <Document>
    <Page size="A4">
    <View style={styles.body}>
        <Text style={styles.title}>IP Address Information</Text>

        <Text style={styles.header}>IP Address: {content.ip}</Text>

        <Text style={styles.header}>General</Text>

        <Text style={styles.text}>Continent: {country.region}</Text>
        <Text style={styles.text}>Country: {content.country_name}</Text>
        <Text style={styles.text}>Region: {content.region}</Text>
        <Text style={styles.text}>City: {content.city}</Text>

        <Text  style={styles.header}>Details</Text>

        <Text style={styles.text}>UN Member: {country.unMember ? 'Yes' : 'No'}</Text>
        <Text style={styles.text}>Population: {country.population}</Text>
        <Text style={styles.text}>Subregion: {country.subregion}</Text>
        <Text style={styles.text}>Currency: {content.currency_name}</Text>
        <Text style={styles.text}>Zip Code: {content.country_code}</Text>
        <Text style={styles.text}>Capital: {country.capital}</Text>
        <Text style={styles.text}>Timezone: {content.timezone}</Text>
        <Text style={styles.text}>Coordinates: {content.latitude}, {content.longitude}</Text>
      </View>
    </Page>
  </Document>
);

Font.register({
    family: 'Oswald',
    src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
  });

// Create styles
const styles = StyleSheet.create({
    body: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
      },
      title: {
        fontSize: 24 ,
        textAlign: 'center',
        fontFamily: 'Oswald'
      },
      header: {
        fontSize: 18,
        color: "gray",
        marginVertical: 20
      },
      text: {
        fontSize: 14,
      },
});

export default MyDocument;
