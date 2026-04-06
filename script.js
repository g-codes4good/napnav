/* ============================================================
   NapNav — Smart Flight Planning for Families
   script.js
   ============================================================ */

// ============ AIRPORT DATABASE (code, city, timezone, coordinates) ============
const AIRPORT_TZ = {
  // US — Eastern
  'ATL': { city: 'Atlanta, GA',              tz: 'America/New_York',                lat: 33.64,  lon: -84.43  },
  'JFK': { city: 'New York JFK, NY',          tz: 'America/New_York',                lat: 40.64,  lon: -73.78  },
  'LGA': { city: 'New York LaGuardia, NY',    tz: 'America/New_York',                lat: 40.78,  lon: -73.87  },
  'EWR': { city: 'Newark, NJ',               tz: 'America/New_York',                lat: 40.69,  lon: -74.17  },
  'BOS': { city: 'Boston, MA',               tz: 'America/New_York',                lat: 42.37,  lon: -71.02  },
  'DCA': { city: 'Washington Reagan, DC',     tz: 'America/New_York',                lat: 38.85,  lon: -77.04  },
  'IAD': { city: 'Washington Dulles, DC',     tz: 'America/New_York',                lat: 38.94,  lon: -77.46  },
  'BWI': { city: 'Baltimore, MD',             tz: 'America/New_York',                lat: 39.18,  lon: -76.67  },
  'PHL': { city: 'Philadelphia, PA',          tz: 'America/New_York',                lat: 39.87,  lon: -75.24  },
  'CLT': { city: 'Charlotte, NC',             tz: 'America/New_York',                lat: 35.21,  lon: -80.94  },
  'RDU': { city: 'Raleigh-Durham, NC',        tz: 'America/New_York',                lat: 35.88,  lon: -78.79  },
  'MIA': { city: 'Miami, FL',                 tz: 'America/New_York',                lat: 25.80,  lon: -80.29  },
  'FLL': { city: 'Fort Lauderdale, FL',       tz: 'America/New_York',                lat: 26.07,  lon: -80.15  },
  'MCO': { city: 'Orlando, FL',               tz: 'America/New_York',                lat: 28.43,  lon: -81.31  },
  'TPA': { city: 'Tampa, FL',                 tz: 'America/New_York',                lat: 27.98,  lon: -82.53  },
  'DTW': { city: 'Detroit, MI',               tz: 'America/New_York',                lat: 42.21,  lon: -83.35  },
  'PIT': { city: 'Pittsburgh, PA',            tz: 'America/New_York',                lat: 40.49,  lon: -80.23  },
  'BUF': { city: 'Buffalo, NY',               tz: 'America/New_York',                lat: 42.94,  lon: -78.73  },
  'CLE': { city: 'Cleveland, OH',             tz: 'America/New_York',                lat: 41.41,  lon: -81.85  },
  'CMH': { city: 'Columbus, OH',              tz: 'America/New_York',                lat: 39.99,  lon: -82.89  },
  'CVG': { city: 'Cincinnati, OH',            tz: 'America/New_York',                lat: 39.05,  lon: -84.67  },
  'IND': { city: 'Indianapolis, IN',          tz: 'America/Indiana/Indianapolis',    lat: 39.72,  lon: -86.29  },
  'SJU': { city: 'San Juan, PR',              tz: 'America/Puerto_Rico',             lat: 18.44,  lon: -66.00  },
  // US — Central
  'ORD': { city: "Chicago O'Hare, IL",        tz: 'America/Chicago',                 lat: 41.98,  lon: -87.91  },
  'MDW': { city: 'Chicago Midway, IL',        tz: 'America/Chicago',                 lat: 41.79,  lon: -87.75  },
  'MSP': { city: 'Minneapolis, MN',           tz: 'America/Chicago',                 lat: 44.88,  lon: -93.22  },
  'STL': { city: 'St. Louis, MO',             tz: 'America/Chicago',                 lat: 38.75,  lon: -90.37  },
  'MSY': { city: 'New Orleans, LA',           tz: 'America/Chicago',                 lat: 29.99,  lon: -90.26  },
  'IAH': { city: 'Houston Intercontinental, TX', tz: 'America/Chicago',             lat: 29.99,  lon: -95.34  },
  'HOU': { city: 'Houston Hobby, TX',         tz: 'America/Chicago',                 lat: 29.65,  lon: -95.28  },
  'DFW': { city: 'Dallas-Fort Worth, TX',     tz: 'America/Chicago',                 lat: 32.90,  lon: -97.04  },
  'DAL': { city: 'Dallas Love Field, TX',     tz: 'America/Chicago',                 lat: 32.85,  lon: -96.85  },
  'SAT': { city: 'San Antonio, TX',           tz: 'America/Chicago',                 lat: 29.53,  lon: -98.47  },
  'AUS': { city: 'Austin, TX',                tz: 'America/Chicago',                 lat: 30.20,  lon: -97.67  },
  'MCI': { city: 'Kansas City, MO',           tz: 'America/Chicago',                 lat: 39.30,  lon: -94.71  },
  'MKE': { city: 'Milwaukee, WI',             tz: 'America/Chicago',                 lat: 42.95,  lon: -87.90  },
  'MEM': { city: 'Memphis, TN',               tz: 'America/Chicago',                 lat: 35.04,  lon: -89.98  },
  'BNA': { city: 'Nashville, TN',             tz: 'America/Chicago',                 lat: 36.12,  lon: -86.68  },
  'OKC': { city: 'Oklahoma City, OK',         tz: 'America/Chicago',                 lat: 35.39,  lon: -97.60  },
  'TUL': { city: 'Tulsa, OK',                 tz: 'America/Chicago',                 lat: 36.20,  lon: -95.89  },
  'LIT': { city: 'Little Rock, AR',           tz: 'America/Chicago',                 lat: 34.73,  lon: -92.22  },
  'DSM': { city: 'Des Moines, IA',            tz: 'America/Chicago',                 lat: 41.53,  lon: -93.66  },
  'OMA': { city: 'Omaha, NE',                 tz: 'America/Chicago',                 lat: 41.30,  lon: -95.89  },
  // US — Mountain
  'DEN': { city: 'Denver, CO',                tz: 'America/Denver',                  lat: 39.86,  lon: -104.67 },
  'SLC': { city: 'Salt Lake City, UT',        tz: 'America/Denver',                  lat: 40.79,  lon: -111.98 },
  'ABQ': { city: 'Albuquerque, NM',           tz: 'America/Denver',                  lat: 35.04,  lon: -106.62 },
  'BOI': { city: 'Boise, ID',                 tz: 'America/Denver',                  lat: 43.56,  lon: -116.22 },
  'BZN': { city: 'Bozeman, MT',               tz: 'America/Denver',                  lat: 45.78,  lon: -111.16 },
  'PHX': { city: 'Phoenix, AZ',               tz: 'America/Phoenix',                 lat: 33.44,  lon: -112.01 },
  'TUS': { city: 'Tucson, AZ',                tz: 'America/Phoenix',                 lat: 32.12,  lon: -110.94 },
  // US — Pacific
  'LAX': { city: 'Los Angeles, CA',           tz: 'America/Los_Angeles',             lat: 33.94,  lon: -118.41 },
  'SFO': { city: 'San Francisco, CA',         tz: 'America/Los_Angeles',             lat: 37.62,  lon: -122.38 },
  'SJC': { city: 'San Jose, CA',              tz: 'America/Los_Angeles',             lat: 37.36,  lon: -121.93 },
  'OAK': { city: 'Oakland, CA',               tz: 'America/Los_Angeles',             lat: 37.72,  lon: -122.22 },
  'BUR': { city: 'Burbank, CA',               tz: 'America/Los_Angeles',             lat: 34.20,  lon: -118.36 },
  'SNA': { city: 'Orange County, CA',         tz: 'America/Los_Angeles',             lat: 33.68,  lon: -117.87 },
  'SAN': { city: 'San Diego, CA',             tz: 'America/Los_Angeles',             lat: 32.73,  lon: -117.19 },
  'SMF': { city: 'Sacramento, CA',            tz: 'America/Los_Angeles',             lat: 38.70,  lon: -121.59 },
  'SEA': { city: 'Seattle, WA',               tz: 'America/Los_Angeles',             lat: 47.45,  lon: -122.31 },
  'PDX': { city: 'Portland, OR',              tz: 'America/Los_Angeles',             lat: 45.59,  lon: -122.60 },
  'LAS': { city: 'Las Vegas, NV',             tz: 'America/Los_Angeles',             lat: 36.08,  lon: -115.15 },
  'RNO': { city: 'Reno, NV',                  tz: 'America/Los_Angeles',             lat: 39.50,  lon: -119.77 },
  // US — Alaska & Hawaii
  'ANC': { city: 'Anchorage, AK',             tz: 'America/Anchorage',               lat: 61.17,  lon: -150.02 },
  'FAI': { city: 'Fairbanks, AK',             tz: 'America/Anchorage',               lat: 64.82,  lon: -147.86 },
  'HNL': { city: 'Honolulu, HI',              tz: 'Pacific/Honolulu',                lat: 21.33,  lon: -157.92 },
  'OGG': { city: 'Maui, HI',                  tz: 'Pacific/Honolulu',                lat: 20.90,  lon: -156.43 },
  'KOA': { city: 'Kona, HI',                  tz: 'Pacific/Honolulu',                lat: 19.74,  lon: -156.04 },
  'LIH': { city: 'Kauai, HI',                 tz: 'Pacific/Honolulu',                lat: 21.98,  lon: -159.34 },
  // Canada
  'YYZ': { city: 'Toronto, ON',               tz: 'America/Toronto',                 lat: 43.68,  lon: -79.63  },
  'YUL': { city: 'Montreal, QC',              tz: 'America/Toronto',                 lat: 45.47,  lon: -73.74  },
  'YOW': { city: 'Ottawa, ON',                tz: 'America/Toronto',                 lat: 45.32,  lon: -75.67  },
  'YVR': { city: 'Vancouver, BC',             tz: 'America/Vancouver',               lat: 49.19,  lon: -123.18 },
  'YYC': { city: 'Calgary, AB',               tz: 'America/Edmonton',                lat: 51.13,  lon: -114.02 },
  'YEG': { city: 'Edmonton, AB',              tz: 'America/Edmonton',                lat: 53.31,  lon: -113.58 },
  'YWG': { city: 'Winnipeg, MB',              tz: 'America/Winnipeg',                lat: 49.91,  lon: -97.24  },
  // Mexico & Caribbean
  'MEX': { city: 'Mexico City, Mexico',       tz: 'America/Mexico_City',             lat: 19.44,  lon: -99.07  },
  'CUN': { city: 'Cancún, Mexico',            tz: 'America/Cancun',                  lat: 21.04,  lon: -86.87  },
  'GDL': { city: 'Guadalajara, Mexico',       tz: 'America/Mexico_City',             lat: 20.52,  lon: -103.31 },
  'MTY': { city: 'Monterrey, Mexico',         tz: 'America/Monterrey',               lat: 25.78,  lon: -100.11 },
  'PVR': { city: 'Puerto Vallarta, Mexico',   tz: 'America/Mexico_City',             lat: 20.68,  lon: -105.25 },
  'SJD': { city: 'Los Cabos, Mexico',         tz: 'America/Mazatlan',                lat: 23.15,  lon: -109.72 },
  'NAS': { city: 'Nassau, Bahamas',           tz: 'America/Nassau',                  lat: 25.04,  lon: -77.47  },
  'MBJ': { city: 'Montego Bay, Jamaica',      tz: 'America/Jamaica',                 lat: 18.50,  lon: -77.91  },
  'KIN': { city: 'Kingston, Jamaica',         tz: 'America/Jamaica',                 lat: 17.94,  lon: -76.79  },
  'GCM': { city: 'Grand Cayman',              tz: 'America/Cayman',                  lat: 19.29,  lon: -81.36  },
  'PUJ': { city: 'Punta Cana, D.R.',          tz: 'America/Santo_Domingo',           lat: 18.57,  lon: -68.37  },
  'STT': { city: 'St. Thomas, USVI',          tz: 'America/St_Thomas',               lat: 18.34,  lon: -64.97  },
  // Central & South America
  'BOG': { city: 'Bogotá, Colombia',          tz: 'America/Bogota',                  lat:  4.70,  lon: -74.15  },
  'LIM': { city: 'Lima, Peru',                tz: 'America/Lima',                    lat: -12.02, lon: -77.11  },
  'SCL': { city: 'Santiago, Chile',           tz: 'America/Santiago',                lat: -33.39, lon: -70.79  },
  'EZE': { city: 'Buenos Aires, Argentina',   tz: 'America/Argentina/Buenos_Aires',  lat: -34.82, lon: -58.54  },
  'GRU': { city: 'São Paulo, Brazil',         tz: 'America/Sao_Paulo',               lat: -23.43, lon: -46.47  },
  'GIG': { city: 'Rio de Janeiro, Brazil',    tz: 'America/Sao_Paulo',               lat: -22.82, lon: -43.25  },
  'PTY': { city: 'Panama City, Panama',       tz: 'America/Panama',                  lat:  9.07,  lon: -79.38  },
  'SJO': { city: 'San José, Costa Rica',      tz: 'America/Costa_Rica',              lat:  9.99,  lon: -84.21  },
  // Europe
  'LHR': { city: 'London Heathrow, UK',       tz: 'Europe/London',                   lat: 51.48,  lon:  -0.46  },
  'LGW': { city: 'London Gatwick, UK',        tz: 'Europe/London',                   lat: 51.16,  lon:  -0.18  },
  'STN': { city: 'London Stansted, UK',       tz: 'Europe/London',                   lat: 51.88,  lon:   0.24  },
  'DUB': { city: 'Dublin, Ireland',           tz: 'Europe/Dublin',                   lat: 53.42,  lon:  -6.27  },
  'EDI': { city: 'Edinburgh, Scotland',       tz: 'Europe/London',                   lat: 55.95,  lon:  -3.37  },
  'CDG': { city: 'Paris CDG, France',         tz: 'Europe/Paris',                    lat: 49.01,  lon:   2.55  },
  'ORY': { city: 'Paris Orly, France',        tz: 'Europe/Paris',                    lat: 48.72,  lon:   2.38  },
  'NCE': { city: 'Nice, France',              tz: 'Europe/Paris',                    lat: 43.66,  lon:   7.22  },
  'AMS': { city: 'Amsterdam, Netherlands',    tz: 'Europe/Amsterdam',                lat: 52.31,  lon:   4.77  },
  'FRA': { city: 'Frankfurt, Germany',        tz: 'Europe/Berlin',                   lat: 50.03,  lon:   8.57  },
  'MUC': { city: 'Munich, Germany',           tz: 'Europe/Berlin',                   lat: 48.35,  lon:  11.79  },
  'BER': { city: 'Berlin, Germany',           tz: 'Europe/Berlin',                   lat: 52.37,  lon:  13.52  },
  'MAD': { city: 'Madrid, Spain',             tz: 'Europe/Madrid',                   lat: 40.50,  lon:  -3.57  },
  'BCN': { city: 'Barcelona, Spain',          tz: 'Europe/Madrid',                   lat: 41.30,  lon:   2.08  },
  'FCO': { city: 'Rome, Italy',               tz: 'Europe/Rome',                     lat: 41.80,  lon:  12.25  },
  'MXP': { city: 'Milan, Italy',              tz: 'Europe/Rome',                     lat: 45.63,  lon:   8.73  },
  'VCE': { city: 'Venice, Italy',             tz: 'Europe/Rome',                     lat: 45.51,  lon:  12.35  },
  'ZRH': { city: 'Zurich, Switzerland',       tz: 'Europe/Zurich',                   lat: 47.46,  lon:   8.55  },
  'GVA': { city: 'Geneva, Switzerland',       tz: 'Europe/Zurich',                   lat: 46.24,  lon:   6.11  },
  'VIE': { city: 'Vienna, Austria',           tz: 'Europe/Vienna',                   lat: 48.12,  lon:  16.57  },
  'PRG': { city: 'Prague, Czech Republic',    tz: 'Europe/Prague',                   lat: 50.10,  lon:  14.26  },
  'BUD': { city: 'Budapest, Hungary',         tz: 'Europe/Budapest',                 lat: 47.43,  lon:  19.26  },
  'WAW': { city: 'Warsaw, Poland',            tz: 'Europe/Warsaw',                   lat: 52.17,  lon:  20.97  },
  'CPH': { city: 'Copenhagen, Denmark',       tz: 'Europe/Copenhagen',               lat: 55.62,  lon:  12.66  },
  'ARN': { city: 'Stockholm, Sweden',         tz: 'Europe/Stockholm',                lat: 59.65,  lon:  17.92  },
  'OSL': { city: 'Oslo, Norway',              tz: 'Europe/Oslo',                     lat: 60.12,  lon:  11.10  },
  'HEL': { city: 'Helsinki, Finland',         tz: 'Europe/Helsinki',                 lat: 60.32,  lon:  24.96  },
  'LIS': { city: 'Lisbon, Portugal',          tz: 'Europe/Lisbon',                   lat: 38.78,  lon:  -9.13  },
  'OPO': { city: 'Porto, Portugal',           tz: 'Europe/Lisbon',                   lat: 41.24,  lon:  -8.68  },
  'ATH': { city: 'Athens, Greece',            tz: 'Europe/Athens',                   lat: 37.94,  lon:  23.95  },
  'IST': { city: 'Istanbul, Turkey',          tz: 'Europe/Istanbul',                 lat: 40.98,  lon:  28.82  },
  'SVO': { city: 'Moscow, Russia',            tz: 'Europe/Moscow',                   lat: 55.97,  lon:  37.41  },
  'BRU': { city: 'Brussels, Belgium',         tz: 'Europe/Brussels',                 lat: 50.90,  lon:   4.48  },
  // Middle East
  'DXB': { city: 'Dubai, UAE',                tz: 'Asia/Dubai',                      lat: 25.25,  lon:  55.36  },
  'AUH': { city: 'Abu Dhabi, UAE',            tz: 'Asia/Dubai',                      lat: 24.43,  lon:  54.65  },
  'DOH': { city: 'Doha, Qatar',               tz: 'Asia/Qatar',                      lat: 25.27,  lon:  51.61  },
  'KWI': { city: 'Kuwait City, Kuwait',       tz: 'Asia/Kuwait',                     lat: 29.23,  lon:  47.97  },
  'RUH': { city: 'Riyadh, Saudi Arabia',      tz: 'Asia/Riyadh',                     lat: 24.96,  lon:  46.70  },
  'JED': { city: 'Jeddah, Saudi Arabia',      tz: 'Asia/Riyadh',                     lat: 21.68,  lon:  39.16  },
  'TLV': { city: 'Tel Aviv, Israel',          tz: 'Asia/Jerusalem',                  lat: 32.01,  lon:  34.89  },
  'AMM': { city: 'Amman, Jordan',             tz: 'Asia/Amman',                      lat: 31.72,  lon:  35.99  },
  // South Asia
  'DEL': { city: 'Delhi, India',              tz: 'Asia/Kolkata',                    lat: 28.56,  lon:  77.10  },
  'BOM': { city: 'Mumbai, India',             tz: 'Asia/Kolkata',                    lat: 19.09,  lon:  72.87  },
  'BLR': { city: 'Bangalore, India',          tz: 'Asia/Kolkata',                    lat: 13.20,  lon:  77.71  },
  'MAA': { city: 'Chennai, India',            tz: 'Asia/Kolkata',                    lat: 12.99,  lon:  80.17  },
  'HYD': { city: 'Hyderabad, India',          tz: 'Asia/Kolkata',                    lat: 17.23,  lon:  78.43  },
  'CMB': { city: 'Colombo, Sri Lanka',        tz: 'Asia/Colombo',                    lat:  7.18,  lon:  79.88  },
  'KTM': { city: 'Kathmandu, Nepal',          tz: 'Asia/Kathmandu',                  lat: 27.70,  lon:  85.36  },
  // Southeast Asia
  'SIN': { city: 'Singapore',                 tz: 'Asia/Singapore',                  lat:  1.36,  lon: 103.99  },
  'BKK': { city: 'Bangkok, Thailand',         tz: 'Asia/Bangkok',                    lat: 13.69,  lon: 100.75  },
  'KUL': { city: 'Kuala Lumpur, Malaysia',    tz: 'Asia/Kuala_Lumpur',               lat:  2.74,  lon: 101.71  },
  'CGK': { city: 'Jakarta, Indonesia',        tz: 'Asia/Jakarta',                    lat: -6.13,  lon: 106.66  },
  'DPS': { city: 'Bali, Indonesia',           tz: 'Asia/Makassar',                   lat: -8.75,  lon: 115.17  },
  'MNL': { city: 'Manila, Philippines',       tz: 'Asia/Manila',                     lat: 14.51,  lon: 121.02  },
  'SGN': { city: 'Ho Chi Minh City, Vietnam', tz: 'Asia/Ho_Chi_Minh',                lat: 10.82,  lon: 106.66  },
  'HAN': { city: 'Hanoi, Vietnam',            tz: 'Asia/Bangkok',                    lat: 21.22,  lon: 105.81  },
  'REP': { city: 'Siem Reap, Cambodia',       tz: 'Asia/Phnom_Penh',                 lat: 13.41,  lon: 103.81  },
  // East Asia
  'PEK': { city: 'Beijing, China',            tz: 'Asia/Shanghai',                   lat: 40.08,  lon: 116.60  },
  'PVG': { city: 'Shanghai, China',           tz: 'Asia/Shanghai',                   lat: 31.15,  lon: 121.80  },
  'CAN': { city: 'Guangzhou, China',          tz: 'Asia/Shanghai',                   lat: 23.39,  lon: 113.30  },
  'HKG': { city: 'Hong Kong',                 tz: 'Asia/Hong_Kong',                  lat: 22.31,  lon: 113.92  },
  'NRT': { city: 'Tokyo Narita, Japan',       tz: 'Asia/Tokyo',                      lat: 35.77,  lon: 140.39  },
  'HND': { city: 'Tokyo Haneda, Japan',       tz: 'Asia/Tokyo',                      lat: 35.55,  lon: 139.78  },
  'KIX': { city: 'Osaka, Japan',              tz: 'Asia/Tokyo',                      lat: 34.43,  lon: 135.24  },
  'ICN': { city: 'Seoul, South Korea',        tz: 'Asia/Seoul',                      lat: 37.46,  lon: 126.44  },
  'TPE': { city: 'Taipei, Taiwan',            tz: 'Asia/Taipei',                     lat: 25.08,  lon: 121.23  },
  // Oceania
  'SYD': { city: 'Sydney, Australia',         tz: 'Australia/Sydney',                lat: -33.95, lon: 151.18  },
  'MEL': { city: 'Melbourne, Australia',      tz: 'Australia/Melbourne',             lat: -37.67, lon: 144.84  },
  'BNE': { city: 'Brisbane, Australia',       tz: 'Australia/Brisbane',              lat: -27.38, lon: 153.12  },
  'PER': { city: 'Perth, Australia',          tz: 'Australia/Perth',                 lat: -31.94, lon: 115.97  },
  'AKL': { city: 'Auckland, New Zealand',     tz: 'Pacific/Auckland',                lat: -37.01, lon: 174.79  },
  'NAN': { city: 'Nadi, Fiji',               tz: 'Pacific/Fiji',                    lat: -17.76, lon: 177.45  },
  'PPT': { city: 'Tahiti, French Polynesia',  tz: 'Pacific/Tahiti',                  lat: -17.56, lon: -149.61 },
  // Africa
  'JNB': { city: 'Johannesburg, South Africa',tz: 'Africa/Johannesburg',             lat: -26.14, lon:  28.24  },
  'CPT': { city: 'Cape Town, South Africa',   tz: 'Africa/Johannesburg',             lat: -33.97, lon:  18.60  },
  'CAI': { city: 'Cairo, Egypt',              tz: 'Africa/Cairo',                    lat: 30.12,  lon:  31.41  },
  'NBO': { city: 'Nairobi, Kenya',            tz: 'Africa/Nairobi',                  lat: -1.32,  lon:  36.93  },
  'LOS': { city: 'Lagos, Nigeria',            tz: 'Africa/Lagos',                    lat:  6.58,  lon:   3.32  },
  'ACC': { city: 'Accra, Ghana',              tz: 'Africa/Accra',                    lat:  5.61,  lon:  -0.17  },
  'CMN': { city: 'Casablanca, Morocco',       tz: 'Africa/Casablanca',               lat: 33.37,  lon:  -7.59  },
  'ADD': { city: 'Addis Ababa, Ethiopia',     tz: 'Africa/Addis_Ababa',              lat:  8.98,  lon:  38.80  },
};

// ============ SLEEP DEFAULTS BY AGE ============
const SLEEP_DEFAULTS = {
  '0-3mo':   { naps: 4, napSchedule: [{start:'09:00',duration:45},{start:'11:30',duration:45},{start:'14:00',duration:45},{start:'16:30',duration:30}], bedtime:'19:00', wakeTime:'07:00', maxAwake:60 },
  '3-6mo':   { naps: 3, napSchedule: [{start:'09:00',duration:60},{start:'12:00',duration:60},{start:'15:30',duration:30}], bedtime:'19:00', wakeTime:'07:00', maxAwake:90 },
  '6-9mo':   { naps: 2, napSchedule: [{start:'09:30',duration:75},{start:'14:00',duration:75}], bedtime:'18:30', wakeTime:'06:30', maxAwake:150 },
  '9-12mo':  { naps: 2, napSchedule: [{start:'09:30',duration:90},{start:'14:00',duration:90}], bedtime:'19:00', wakeTime:'06:30', maxAwake:180 },
  '12-18mo': { naps: 1, napSchedule: [{start:'12:30',duration:90}], bedtime:'19:00', wakeTime:'06:30', maxAwake:210 },
  '18-24mo': { naps: 1, napSchedule: [{start:'13:00',duration:120}], bedtime:'19:30', wakeTime:'07:00', maxAwake:240 },
  '2-3yr':   { naps: 1, napSchedule: [{start:'13:00',duration:120}], bedtime:'20:00', wakeTime:'07:00', maxAwake:300 },
  '3-4yr':   { naps: 0, napSchedule: [], bedtime:'20:00', wakeTime:'07:00', maxAwake:780 },
  '4-5yr':   { naps: 0, napSchedule: [], bedtime:'20:30', wakeTime:'07:00', maxAwake:810 },
  '5+yr':    { naps: 0, napSchedule: [], bedtime:'21:00', wakeTime:'07:00', maxAwake:840 },
};

// ============ STATE ============
let currentStep = 1;
let numChildren = 1;
let selectedDurationMinutes = null;
let estimatedDurationMinutes = null; // auto-calculated from airports
let redeyeOk = true;
let detectedDepTZ = null;
let detectedArrTZ = null;
let tzDiffMinutes = 0;

// ============ INIT ============
document.addEventListener('DOMContentLoaded', () => {
  setMinDate();
  generateChildCard(0);
  setupChildCountButtons();
  setupDurationButtons();
  setupAirportListeners();
});

function setMinDate() {
  const today = new Date().toISOString().split('T')[0];
  ['dep-date','ret-date'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.min = today;
  });
}

// ============ DISTANCE & FLIGHT DURATION ESTIMATION ============
function toRad(deg) { return deg * Math.PI / 180; }

function haversineDistanceMiles(lat1, lon1, lat2, lon2) {
  const R = 3958.8; // Earth radius in miles
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2 +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

function estimateFlightMinutes(distanceMiles) {
  // Average block speed ~490 mph for short, ~530 mph for long haul
  // Add 40 min for taxi, takeoff, descent overhead
  const speed = distanceMiles < 1000 ? 450 : distanceMiles < 3000 ? 490 : 530;
  return Math.round((distanceMiles / speed) * 60) + 40;
}

function autoSelectDuration(estMins) {
  estimatedDurationMinutes = estMins;
  selectedDurationMinutes = estMins;

  // Highlight the closest button
  const durations = [60,90,120,150,180,210,240,300,360,420,480,600,720,900];
  const closest = durations.reduce((p, c) =>
    Math.abs(c - estMins) < Math.abs(p - estMins) ? c : p);

  document.querySelectorAll('.dur-btn').forEach(btn => {
    btn.classList.toggle('active', parseInt(btn.dataset.minutes) === closest);
  });

  const hrs = Math.floor(estMins / 60);
  const mins = estMins % 60;
  const label = document.getElementById('duration-selected');
  label.textContent = `Auto-estimated: ~${hrs}h${mins > 0 ? ' ' + mins + 'm' : ''} nonstop (you can adjust above)`;
  label.classList.remove('hidden');
}

// ============ AIRPORT AUTOCOMPLETE ============
function setupAirportListeners() {
  setupOneAirportField('dep-airport', 'dep-dropdown', 'dep-status', 'dep');
  setupOneAirportField('arr-airport', 'arr-dropdown', 'arr-status', 'arr');
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.airport-input-wrap')) {
      document.querySelectorAll('.airport-dropdown').forEach(d => d.classList.add('hidden'));
    }
  });
}

function setupOneAirportField(inputId, dropdownId, statusId, side) {
  const inputEl    = document.getElementById(inputId);
  const dropdownEl = document.getElementById(dropdownId);
  const statusEl   = document.getElementById(statusId);
  if (!inputEl) return;

  inputEl.addEventListener('input', () => {
    const results = filterAirports(inputEl.value.trim());
    renderDropdown(dropdownEl, results, inputEl, statusEl, side);
    if (!lookupAirport(inputEl.value)) {
      statusEl.textContent = inputEl.value.length > 1 ? 'Type a 3-letter airport code (e.g. ATL) or city name' : '';
      statusEl.style.color = 'var(--text-muted)';
      if (side === 'dep') detectedDepTZ = null;
      else                detectedArrTZ = null;
      document.getElementById('tz-display').classList.add('hidden');
    }
  });

  inputEl.addEventListener('focus', () => {
    const results = filterAirports(inputEl.value.trim());
    if (results.length) renderDropdown(dropdownEl, results, inputEl, statusEl, side);
  });

  inputEl.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') dropdownEl.classList.add('hidden');
  });
}

function filterAirports(query) {
  if (!query || query.length < 1) return [];
  const q  = query.toUpperCase();
  const ql = query.toLowerCase();
  const t0=[], t1=[], t2=[], t3=[];
  for (const [code, info] of Object.entries(AIRPORT_TZ)) {
    if (code === q)                                  t0.push({ code, ...info });
    else if (code.startsWith(q))                     t1.push({ code, ...info });
    else if (info.city.toLowerCase().startsWith(ql)) t2.push({ code, ...info });
    else if (info.city.toLowerCase().includes(ql))   t3.push({ code, ...info });
  }
  return [...t0, ...t1, ...t2, ...t3].slice(0, 8);
}

function renderDropdown(dropdownEl, results, inputEl, statusEl, side) {
  if (!results.length) { dropdownEl.innerHTML = ''; dropdownEl.classList.add('hidden'); return; }
  dropdownEl.innerHTML = results.map(r => `
    <div class="airport-option" data-code="${r.code}">
      <span class="airport-opt-code">${r.code}</span>
      <span class="airport-opt-city">${r.city}</span>
    </div>`).join('');
  dropdownEl.classList.remove('hidden');

  dropdownEl.querySelectorAll('.airport-option').forEach(opt => {
    opt.addEventListener('mousedown', (e) => {
      e.preventDefault();
      const code = opt.dataset.code;
      const info = AIRPORT_TZ[code];
      inputEl.value = `${code} — ${info.city}`;
      dropdownEl.classList.add('hidden');
      statusEl.textContent = `✓ ${code} — ${info.city}`;
      statusEl.style.color = 'var(--success)';
      if (side === 'dep') detectedDepTZ = info.tz;
      else                detectedArrTZ = info.tz;
      updateTZ();
    });
  });
}

function lookupAirport(input) {
  if (!input) return null;
  const upper = input.trim().toUpperCase();
  if (AIRPORT_TZ[upper]) return { code: upper, ...AIRPORT_TZ[upper] };
  const codeMatch = upper.match(/^([A-Z]{3})\s*[—\-]/);
  if (codeMatch && AIRPORT_TZ[codeMatch[1]]) return { code: codeMatch[1], ...AIRPORT_TZ[codeMatch[1]] };
  const lower = input.trim().toLowerCase();
  for (const [code, info] of Object.entries(AIRPORT_TZ)) {
    if (info.city.toLowerCase().includes(lower)) return { code, ...info };
  }
  return null;
}

function getUTCOffsetMinutes(ianaTimezone) {
  try {
    const now = new Date();
    const localStr = now.toLocaleString('en-CA', {
      timeZone: ianaTimezone, hour12: false,
      year:'numeric', month:'2-digit', day:'2-digit',
      hour:'2-digit', minute:'2-digit', second:'2-digit'
    });
    const [datePart, timePart] = localStr.split(', ');
    const [yr, mo, dy] = datePart.split('-').map(Number);
    const [hh, mm, ss] = timePart.split(':').map(Number);
    const tzMs  = Date.UTC(yr, mo - 1, dy, hh, mm, ss);
    return (tzMs - now.getTime()) / 60000;
  } catch { return 0; }
}

function updateTZ() {
  const depAirport = lookupAirport(document.getElementById('dep-airport').value);
  const arrAirport = lookupAirport(document.getElementById('arr-airport').value);
  const display    = document.getElementById('tz-display');

  if (!depAirport || !arrAirport) { display.classList.add('hidden'); return; }

  const depOffset = getUTCOffsetMinutes(depAirport.tz);
  const arrOffset = getUTCOffsetMinutes(arrAirport.tz);
  tzDiffMinutes   = Math.round(arrOffset - depOffset);

  const fmtOffset = (min) => {
    const sign = min >= 0 ? '+' : '-';
    const h = Math.floor(Math.abs(min) / 60);
    const m = Math.abs(min) % 60;
    return `UTC${sign}${h}${m ? ':' + String(m).padStart(2,'0') : ''}`;
  };

  document.getElementById('tz-dep-info').innerHTML =
    `<strong>${depAirport.code}</strong><br>${depAirport.city}<br><span class="tz-offset">${fmtOffset(depOffset)}</span>`;
  document.getElementById('tz-arr-info').innerHTML =
    `<strong>${arrAirport.code}</strong><br>${arrAirport.city}<br><span class="tz-offset">${fmtOffset(arrOffset)}</span>`;

  const tzAbsH = Math.abs(tzDiffMinutes / 60);
  let tzText = tzDiffMinutes === 0
    ? '✓ Same time zone — no jet lag adjustment needed'
    : `Destination is ${tzAbsH}h ${tzDiffMinutes > 0 ? 'ahead of' : 'behind'} home · ~${Math.ceil(tzAbsH)} day${Math.ceil(tzAbsH) !== 1 ? 's' : ''} adjustment · ${tzDiffMinutes > 0 ? 'eastward (harder jet lag)' : 'westward (easier jet lag)'}`;

  document.getElementById('tz-result-text').textContent = tzText;

  // Auto-calculate flight duration from great-circle distance
  const estRow = document.getElementById('flight-est-row');
  if (depAirport.lat !== undefined && arrAirport.lat !== undefined) {
    const distMiles = haversineDistanceMiles(depAirport.lat, depAirport.lon, arrAirport.lat, arrAirport.lon);
    const estMins   = estimateFlightMinutes(distMiles);
    const estHrs    = Math.floor(estMins / 60);
    const estMin    = estMins % 60;
    document.getElementById('flight-est-text').textContent =
      `✈️ Estimated nonstop flight: ~${estHrs}h${estMin > 0 ? ' ' + estMin + 'm' : ''} (${Math.round(distMiles).toLocaleString()} mi)`;
    estRow.classList.remove('hidden');
    autoSelectDuration(estMins);
  } else {
    estRow.classList.add('hidden');
  }

  display.classList.remove('hidden');
}

// ============ DURATION PICKER ============
function setupDurationButtons() {
  document.querySelectorAll('.dur-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.dur-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedDurationMinutes = parseInt(btn.dataset.minutes);
      const label = document.getElementById('duration-selected');
      const hrs = Math.floor(selectedDurationMinutes / 60);
      const mins = selectedDurationMinutes % 60;
      const wasAuto = estimatedDurationMinutes && selectedDurationMinutes === estimatedDurationMinutes;
      label.textContent = wasAuto
        ? `Auto-estimated: ~${hrs}h${mins > 0 ? ' ' + mins + 'm' : ''} nonstop (you can adjust above)`
        : `Selected: ${hrs}h${mins > 0 ? ' ' + mins + 'm' : ''}`;
      label.classList.remove('hidden');
    });
  });
}

function setRedeye(val) {
  redeyeOk = val;
  document.getElementById('redeye-yes').classList.toggle('active',  val);
  document.getElementById('redeye-no').classList.toggle('active', !val);
}

// ============ CHILD CARD GENERATION ============
function generateChildCard(index) {
  const container   = document.getElementById('children-container');
  const placeholders = ['e.g. Mia', 'e.g. Leo', 'e.g. Zoe'];
  const card = document.createElement('div');
  card.className = 'child-card form-card';
  card.id = `child-card-${index}`;
  if (index > 0) card.classList.add('hidden');

  card.innerHTML = `
    <h3>Child ${index + 1}</h3>
    <div class="field-row">
      <div class="field-group">
        <label class="field-label">Age Group</label>
        <select class="field-input" id="child-age-${index}">
          <option value="">Select age...</option>
          <option value="0-3mo">0–3 months</option>
          <option value="3-6mo">3–6 months</option>
          <option value="6-9mo">6–9 months</option>
          <option value="9-12mo">9–12 months</option>
          <option value="12-18mo">12–18 months</option>
          <option value="18-24mo">18–24 months</option>
          <option value="2-3yr">2–3 years</option>
          <option value="3-4yr">3–4 years</option>
          <option value="4-5yr">4–5 years</option>
          <option value="5+yr">5+ years</option>
        </select>
      </div>
      <div class="field-group">
        <label class="field-label">Nickname (optional)</label>
        <input type="text" class="field-input" id="child-name-${index}" placeholder="${placeholders[index] || 'e.g. Sam'}">
      </div>
    </div>
    <div class="hidden" id="sleep-section-${index}">
      <h4>Sleep Schedule <span class="auto-badge">Auto-filled — adjust if needed</span></h4>
      <div class="field-row">
        <div class="field-group">
          <label class="field-label">Wake Time</label>
          <input type="time" class="field-input" id="child-wake-${index}" value="07:00">
        </div>
        <div class="field-group">
          <label class="field-label">Bedtime</label>
          <input type="time" class="field-input" id="child-bed-${index}" value="19:30">
        </div>
      </div>
      <div id="naps-container-${index}"></div>
    </div>
    <div class="hidden" id="needs-section-${index}">
      <h4>Sleep Environment & Needs</h4>
      <div class="checkbox-grid">
        <label class="checkbox-label"><input type="checkbox" class="child-need" data-child="${index}" value="white-noise"><span>Needs white noise</span></label>
        <label class="checkbox-label"><input type="checkbox" class="child-need" data-child="${index}" value="blackout"><span>Needs blackout darkness</span></label>
        <label class="checkbox-label"><input type="checkbox" class="child-need" data-child="${index}" value="contact"><span>Contact napper (must be held)</span></label>
        <label class="checkbox-label"><input type="checkbox" class="child-need" data-child="${index}" value="nursing"><span>Nurses / feeds to sleep</span></label>
        <label class="checkbox-label"><input type="checkbox" class="child-need" data-child="${index}" value="pacifier"><span>Pacifier dependent</span></label>
        <label class="checkbox-label"><input type="checkbox" class="child-need" data-child="${index}" value="lovey"><span>Specific lovey / comfort object</span></label>
        <label class="checkbox-label"><input type="checkbox" class="child-need" data-child="${index}" value="sensory"><span>Sensory sensitivities</span></label>
        <label class="checkbox-label"><input type="checkbox" class="child-need" data-child="${index}" value="medical"><span>Medical / special equipment</span></label>
      </div>
      <div class="field-row" style="margin-top:16px;">
        <div class="field-group">
          <label class="field-label">Sleeps in car?</label>
          <select class="field-input" id="child-car-${index}">
            <option value="yes">Yes, reliably</option>
            <option value="sometimes" selected>Sometimes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div class="field-group">
          <label class="field-label">Sleeps on planes?</label>
          <select class="field-input" id="child-plane-${index}">
            <option value="yes">Yes, reliably</option>
            <option value="sometimes">Sometimes</option>
            <option value="no">No</option>
            <option value="unknown" selected>Never flown</option>
          </select>
        </div>
      </div>
      <div class="field-group" style="margin-top:12px;">
        <label class="field-label">Special needs, disabilities, or important notes</label>
        <textarea class="field-input" id="child-special-${index}" rows="2"
          placeholder="e.g. ear tube history, requires specific medication timing, CPAP, severe sleep regression..."></textarea>
      </div>
    </div>`;

  container.appendChild(card);
  document.getElementById(`child-age-${index}`).addEventListener('change', (e) => {
    populateSleepDefaults(index, e.target.value);
  });
}

function populateSleepDefaults(childIndex, ageGroup) {
  const defaults = SLEEP_DEFAULTS[ageGroup];
  if (!defaults) return;
  document.getElementById(`sleep-section-${childIndex}`).classList.remove('hidden');
  document.getElementById(`needs-section-${childIndex}`).classList.remove('hidden');
  document.getElementById(`child-wake-${childIndex}`).value = defaults.wakeTime;
  document.getElementById(`child-bed-${childIndex}`).value  = defaults.bedtime;

  const napsContainer = document.getElementById(`naps-container-${childIndex}`);
  napsContainer.innerHTML = '';
  if (!defaults.napSchedule.length) {
    napsContainer.innerHTML = '<p style="font-size:13px;color:var(--text-muted);font-style:italic;margin-top:8px;">No regular naps at this age!</p>';
    return;
  }
  defaults.napSchedule.forEach((nap, i) => {
    const row = document.createElement('div');
    row.className = 'field-row';
    row.innerHTML = `
      <div class="field-group">
        <label class="field-label">Nap ${i + 1} Start</label>
        <input type="time" class="field-input" id="nap-${childIndex}-${i}-start" value="${nap.start}">
      </div>
      <div class="field-group">
        <label class="field-label">Nap ${i + 1} Duration (minutes)</label>
        <input type="number" class="field-input" id="nap-${childIndex}-${i}-duration" min="15" max="240" value="${nap.duration}">
      </div>`;
    napsContainer.appendChild(row);
  });
}

function setupChildCountButtons() {
  document.querySelectorAll('.count-btn[data-count]').forEach(btn => {
    btn.addEventListener('click', () => {
      const count = parseInt(btn.dataset.count);
      numChildren = count;
      document.querySelectorAll('.count-btn[data-count]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      for (let i = 0; i < count; i++) {
        if (!document.getElementById(`child-card-${i}`)) generateChildCard(i);
      }
      for (let i = 0; i < 3; i++) {
        const card = document.getElementById(`child-card-${i}`);
        if (card) card.classList.toggle('hidden', i >= count);
      }
    });
  });
}

// ============ NAVIGATION ============
function nextStep() { if (currentStep < 5) goToStep(currentStep + 1); }
function prevStep() { if (currentStep > 1) goToStep(currentStep - 1); }

function goToStep(n) {
  document.getElementById(`step-${currentStep}`).classList.add('hidden');
  currentStep = n;
  document.getElementById(`step-${currentStep}`).classList.remove('hidden');
  updateProgressBar();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

const STEP_LABELS = ['Children', 'Trip Details', 'Departure Day', 'Arrival', 'Flight Duration'];

function updateProgressBar() {
  document.querySelectorAll('.progress-step').forEach(step => {
    const n = parseInt(step.dataset.step);
    step.classList.remove('active', 'completed');
    if (n === currentStep) step.classList.add('active');
    if (n < currentStep)   step.classList.add('completed');
  });
  document.querySelectorAll('.progress-line').forEach((line, i) => {
    line.classList.toggle('completed', i + 1 < currentStep);
  });
  // Mobile progress
  const mobileText = document.getElementById('progress-mobile-text');
  const mobileBarFill = document.getElementById('progress-mobile-bar-fill');
  if (mobileText) mobileText.textContent = `Step ${currentStep} of 5 — ${STEP_LABELS[currentStep - 1]}`;
  if (mobileBarFill) mobileBarFill.style.width = `${(currentStep / 5) * 100}%`;
}

// ============ DATA COLLECTION ============
function collectChildData(index) {
  const ageGroup = document.getElementById(`child-age-${index}`)?.value || '';
  const defaults = SLEEP_DEFAULTS[ageGroup] || { napSchedule: [] };
  const naps = [];
  defaults.napSchedule.forEach((_, i) => {
    const startEl = document.getElementById(`nap-${index}-${i}-start`);
    const durEl   = document.getElementById(`nap-${index}-${i}-duration`);
    if (startEl && durEl) naps.push({ start: startEl.value, duration: parseInt(durEl.value) || 60 });
  });
  const needs = [];
  document.querySelectorAll(`.child-need[data-child="${index}"]`).forEach(cb => {
    if (cb.checked) needs.push(cb.value);
  });
  return {
    index,
    age:        ageGroup,
    name:       document.getElementById(`child-name-${index}`)?.value.trim() || `Child ${index + 1}`,
    wakeTime:   document.getElementById(`child-wake-${index}`)?.value || '07:00',
    bedtime:    document.getElementById(`child-bed-${index}`)?.value  || '19:30',
    naps,
    needs,
    carSleep:   document.getElementById(`child-car-${index}`)?.value   || 'sometimes',
    planeSleep: document.getElementById(`child-plane-${index}`)?.value || 'unknown',
    special:    document.getElementById(`child-special-${index}`)?.value || '',
  };
}

function collectFormData() {
  const children = [];
  for (let i = 0; i < numChildren; i++) children.push(collectChildData(i));
  return {
    children,
    flightDuration: selectedDurationMinutes || 180,
    redeyeOk,
    tzDiffMinutes,
    trip: {
      depAirport: document.getElementById('dep-airport')?.value || '',
      arrAirport: document.getElementById('arr-airport')?.value || '',
      depDate:    document.getElementById('dep-date')?.value    || '',
    },
    logistics: {
      driveToAirport:   parseInt(document.getElementById('drive-to-airport')?.value  || '45'),
      tsaPrecheck:      document.getElementById('tsa-precheck')?.value    || 'no',
      carSeat:          document.getElementById('car-seat')?.value        || 'none',
      stroller:         document.getElementById('stroller')?.value        || 'none',
      bags:             parseInt(document.getElementById('bags')?.value   || '2'),
      arrivalTransport: document.getElementById('arrival-transport')?.value || 'rideshare',
      hotelDrive:       parseInt(document.getElementById('hotel-drive')?.value || '45'),
      cribAvailable:    document.getElementById('crib-available')?.value  || 'unknown',
      blackoutAvailable:document.getElementById('blackout-available')?.value || 'unknown',
    },
  };
}

// ============ UTILITIES ============
function timeToMinutes(timeStr) {
  if (!timeStr) return 0;
  const [h, m] = timeStr.split(':').map(Number);
  return h * 60 + m;
}

function minutesToTime(minutes) {
  const mod = ((minutes % 1440) + 1440) % 1440;
  const h = Math.floor(mod / 60);
  const m = mod % 60;
  const ampm = h < 12 ? 'AM' : 'PM';
  const displayH = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return `${displayH}:${String(m).padStart(2, '0')} ${ampm}`;
}

function overlaps(s1, e1, s2, e2) { return s1 < e2 && e1 > s2; }

function scoreLabel(score) {
  if (score >= 75) return { text: 'Excellent',   cls: 'excellent' };
  if (score >= 55) return { text: 'Good',        cls: 'good' };
  if (score >= 35) return { text: 'Fair',        cls: 'fair' };
  return             { text: 'Challenging', cls: 'poor' };
}

// ============ PLAIN-ENGLISH SUBLABEL ============
function generateSublabel(score, positives, warnings) {
  // Check specific conditions from warnings/positives
  const warnTexts = warnings.map(w => w.text.toLowerCase());
  const posTexts  = positives.map(p => p.text.toLowerCase());

  if (warnTexts.some(t => t.includes('redeye') && t.includes('not preferred'))) return 'Redeye — avoid';
  if (warnTexts.some(t => t.includes('mid-'))) return 'Disrupts nap';
  if (warnTexts.some(t => t.includes('hotel arrival') && t.includes('past bedtime'))) return 'Late arrival — risky';
  if (warnTexts.some(t => t.includes('hotel arrival') && t.includes('close to bedtime'))) return 'Arrives at bedtime';
  if (warnTexts.some(t => t.includes('late-night hotel arrival'))) return 'Very late arrival';
  if (warnTexts.some(t => t.includes('middle of the night home'))) return 'Leaves at midnight';
  if (posTexts.some(t =>  t.includes('departs close to') && t.includes('bedtime'))) return 'Redeye-friendly';
  if (posTexts.some(t =>  t.includes('aligns with') && t.includes('nap'))) return 'Strong nap overlap';
  if (posTexts.some(t =>  t.includes('flight spans'))) return 'Nap in-flight';
  if (posTexts.some(t =>  t.includes('flight covers full'))) return 'Full nap on flight';
  if (warnTexts.some(t => t.includes('boards somewhat tired'))) return 'Boards tired';
  if (score >= 70) return 'Excellent window';
  if (score >= 55) return 'Good option';
  if (score >= 40) return 'Fair option';
  if (score >= 25) return 'Marginal';
  return 'Difficult window';
}

// ============ MULTI-CHILD ANALYSIS ============
function getAgeWeight(ageGroup) {
  if (['0-3mo','3-6mo','6-9mo','9-12mo'].includes(ageGroup)) return 4;
  if (['12-18mo','18-24mo','2-3yr'].includes(ageGroup))       return 3;
  if (['3-4yr','4-5yr'].includes(ageGroup))                   return 2;
  return 1;
}

function computeNapWindows(children) {
  return children.map(child => {
    if (!child.naps || !child.naps.length) return { child, napStart: null, napEnd: null };
    // Use first (or most significant) nap
    const nap = child.naps[0];
    const start = timeToMinutes(nap.start);
    return { child, napStart: start, napEnd: start + nap.duration };
  });
}

function computeMultiChildTension(children) {
  const napWindows = computeNapWindows(children).filter(w => w.napStart !== null);
  if (napWindows.length < 2) return null;

  // Find overlap
  let overlapStart = napWindows[0].napStart;
  let overlapEnd   = napWindows[0].napEnd;
  for (const w of napWindows.slice(1)) {
    overlapStart = Math.max(overlapStart, w.napStart);
    overlapEnd   = Math.min(overlapEnd, w.napEnd);
  }
  const hasOverlap = overlapEnd > overlapStart;

  return {
    hasOverlap,
    overlapStart: hasOverlap ? overlapStart : null,
    overlapEnd:   hasOverlap ? overlapEnd   : null,
    napWindows,
  };
}

let priorityChildIndex = -1; // -1 = balance

function setPriority(idx) {
  priorityChildIndex = idx;
  document.querySelectorAll('.priority-btn').forEach((btn, i) => {
    btn.classList.toggle('active', i === idx + 1 || (idx === -1 && i === 0));
  });
  // Re-run analysis with same data
  if (window._lastAnalysisData) {
    const windows = generateFlightWindows(window._lastAnalysisData);
    const allWindows = [];
    for (let depMin = 300; depMin <= 1410; depMin += 30) {
      allWindows.push({ depMin, ...scoreWindow(depMin, window._lastAnalysisData) });
    }
    const container = document.getElementById('results-container');
    container.innerHTML = '';
    windows.forEach((result, i) => container.appendChild(buildWindowCard(result, i + 1, window._lastAnalysisData)));
    renderExploreTimeline(allWindows, window._lastAnalysisData);
  }
}

function renderTensionSection(data) {
  const container = document.getElementById('tension-container');
  if (!container) return;
  if (data.children.length < 2) { container.innerHTML = ''; return; }

  const tension = computeMultiChildTension(data.children);
  if (!tension) { container.innerHTML = ''; return; }

  const names = data.children.map(c => c.name);
  let bodyText = '';
  if (tension.hasOverlap) {
    bodyText = `Both children share a nap window overlap: <strong>${minutesToTime(tension.overlapStart)}–${minutesToTime(tension.overlapEnd)}</strong>. Flights departing just before this window give the best chance of sleep for both.`;
  } else {
    bodyText = `Your children's nap windows don't overlap. We've weighted toward the <strong>younger child</strong> since their sleep needs are more acute. Use the toggle below to override.`;
  }

  const priorityLabels = ['Balance both', ...names];
  container.innerHTML = `
    <div class="tension-section">
      <div class="tension-title">Balancing ${names.join(' & ')}</div>
      <div class="tension-body">${bodyText}</div>
      <div class="priority-toggle">
        ${priorityLabels.map((label, i) => `
          <button class="priority-btn ${i === 0 ? 'active' : ''}" onclick="setPriority(${i - 1})">${label}</button>
        `).join('')}
      </div>
    </div>`;
}

function getChildNapOverlapMinutes(child, depMin, flightDuration) {
  if (!child.naps || !child.naps.length) return 0;
  let total = 0;
  child.naps.forEach(nap => {
    const napStart = timeToMinutes(nap.start);
    const napEnd   = napStart + nap.duration;
    const flightEnd = depMin + flightDuration;
    const overlapStart = Math.max(napStart, depMin);
    const overlapEnd   = Math.min(napEnd, flightEnd);
    if (overlapEnd > overlapStart) total += (overlapEnd - overlapStart);
  });
  return total;
}

function renderChildIndicators(child, depMin, flightDuration) {
  const overlap = getChildNapOverlapMinutes(child, depMin, flightDuration);
  const totalNap = (child.naps || []).reduce((sum, n) => sum + n.duration, 0);
  if (!totalNap) return '';
  const ratio = overlap / totalNap;
  const cls  = ratio >= 0.5 ? 'ind-great' : ratio > 0 ? 'ind-partial' : 'ind-none';
  const icon = ratio >= 0.5 ? '✅' : ratio > 0 ? '⚠️' : '❌';
  return `<span class="child-ind-badge ${cls}">${icon} ${child.name}</span>`;
}

// ============ LIVE FLIGHT FETCH ============
async function fetchLiveFlights(depIata, arrIata, flightDate) {
  const url = `/api/flights?dep_iata=${depIata}&arr_iata=${arrIata}&flight_date=${flightDate}`;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);
  try {
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeout);
    if (!res.ok) return null;
    const json = await res.json();
    if (!json.data || !Array.isArray(json.data) || !json.data.length) return null;
    // Extract relevant fields
    return json.data.map(f => ({
      airline:    f.airline?.name || 'Unknown airline',
      flightNum:  f.flight?.iata  || '',
      depSched:   f.departure?.scheduled || null,
      arrSched:   f.arrival?.scheduled   || null,
      status:     f.flight_status || '',
    })).filter(f => f.depSched && f.arrSched);
  } catch (err) {
    clearTimeout(timeout);
    console.warn('NapNav: live flight fetch failed', err);
    return null;
  }
}

function parseISOToMinutes(isoStr) {
  // Returns minutes since midnight in local time (strips tz, uses wall clock)
  if (!isoStr) return null;
  const d = new Date(isoStr);
  return d.getHours() * 60 + d.getMinutes();
}

function parseISODurationMinutes(depISO, arrISO) {
  if (!depISO || !arrISO) return null;
  return Math.round((new Date(arrISO) - new Date(depISO)) / 60000);
}

// ============ HERO RECOMMENDATION CARD ============
function buildHeroCard(ranked, data) {
  const container = document.getElementById('hero-rec-container');
  if (!container) return;
  if (!ranked || !ranked.length) {
    container.innerHTML = '';
    return;
  }

  const best = ranked[0];
  const child = data.children[0];
  const depA  = lookupAirport(data.trip.depAirport);
  const arrA  = lookupAirport(data.trip.arrAirport);

  // If score is very low, show neutral fallback
  if (best.score < 30) {
    container.innerHTML = `
      <div class="hero-rec-card hero-rec-neutral">
        <div class="hero-rec-icon">✈️</div>
        <div class="hero-rec-title">We weren't able to find a clearly optimal window</div>
        <div class="hero-rec-body">See the full breakdown below for your best available options.</div>
      </div>`;
    return;
  }

  const windowStart = best.depMin - 60;
  const windowEnd   = best.depMin + 60;
  const arrLocalText = minutesToTime(best.hotelDestClock) + (best.isNextDayPlus ? ' next day' : '');

  // Body clock arrival time
  const bodyClockAtHotel = ((best.hotelArriveDest - data.tzDiffMinutes) % 1440 + 1440) % 1440;
  const bodyClockText = minutesToTime(bodyClockAtHotel);

  let napContext = '';
  if (child.naps && child.naps.length) {
    const nap = child.naps[0];
    const napStartM = timeToMinutes(nap.start);
    const napEndM   = napStartM + nap.duration;
    const overlapMins = getChildNapOverlapMinutes(child, best.depMin, data.flightDuration);
    if (overlapMins > 15) {
      const intoFlight = napStartM - best.depMin;
      const intoLabel  = intoFlight > 0
        ? `about ${Math.round(intoFlight / 60 * 10) / 10}h into the flight`
        : 'right at takeoff';
      napContext = `<strong>${child.name}</strong> will hit their natural nap window ${intoLabel}. `;
    }
  }

  const destCity = arrA ? arrA.city.split(',')[0] : 'your destination';

  container.innerHTML = `
    <div class="hero-rec-card">
      <div class="hero-rec-icon">✈️</div>
      <div class="hero-rec-title">Best departure window: ${minutesToTime(windowStart)} – ${minutesToTime(windowEnd)}</div>
      <div class="hero-rec-body">
        ${napContext}Expected arrival in ${destCity}: <strong>${arrLocalText} local time</strong> (${bodyClockText} body clock).
        ${data.tzDiffMinutes !== 0 ? `Their body is still on home time — plan accordingly on arrival day.` : `No timezone adjustment needed.`}
      </div>
    </div>`;
}

// ============ SCORING FAQ ============
function renderScoringFaq() {
  const inner = document.getElementById('faq-panel-inner');
  if (!inner) return;
  inner.innerHTML = `
    <h4>How NapNav scores your flights</h4>
    <p>NapNav scores each flight from 0–100 based on how well it aligns with your child's biological needs.</p>

    <h4>🕐 Nap Window Overlap (up to ~40 pts)</h4>
    <p>The biggest factor. We calculate how many minutes of your child's natural nap window fall during the flight. A flight that departs 30 minutes before nap time and lands after it ends scores highest here.</p>

    <h4>🌍 Body Clock vs. Local Time at Landing (up to ~20 pts)</h4>
    <p>Your child's body doesn't know what time zone you've landed in. We calculate what time it feels like to them when you arrive. Landing at 3pm locally but 9pm body-clock time means an overtired child at your destination. Eastward travel is harder — the body resists staying up later. Expect roughly 1 day of adjustment per time zone crossed.</p>

    <h4>😴 Bedtime Proximity at Landing (up to ~15 pts)</h4>
    <p>Arriving within 1–2 hours of your child's bedtime (body clock) is a bonus — they'll be naturally tired and ready to sleep at the destination.</p>

    <h4>⏱ Flight Duration vs. Nap Duration (up to ~15 pts)</h4>
    <p>A nap requires ~15–20 min to fall asleep plus the full nap duration. If your flight is shorter than your child's nap needs, we reflect that.</p>

    <h4>🧳 Logistics Buffer (up to ~10 pts)</h4>
    <p>We account for your airport drive time, TSA wait (adjusted for PreCheck), stroller time, bags, and ground transport at arrival.</p>

    <h4>For multiple children:</h4>
    <p>We score each child separately, then combine using age-weighted averages. Infants and young toddlers are weighted more heavily — their sleep is less flexible and more consequential when disrupted. Use the priority toggle to override.</p>

    <h4>A note on certainty:</h4>
    <p>Sleep science gives us the framework, but every child is different. NapNav gives you the best probabilistic answer — a well-informed starting point, not a guarantee.</p>
  `;
}

function toggleFaq() {
  const btn   = document.getElementById('faq-toggle-btn');
  const panel = document.getElementById('faq-panel');
  const open  = panel.classList.toggle('open');
  btn.setAttribute('aria-expanded', open);
}

// ============ SCORING ENGINE ============
// Base score: 25. Natural max ~85-90. Bonuses and penalties are calibrated so
// nothing reaches 100 without near-perfect conditions.
function scoreWindow(depMin, data) {
  let score = 25;
  const positives = [];
  const warnings  = [];
  // breakdown tracks every adjustment in order, including the base score
  const breakdown = [{ label: 'Base score', delta: 25 }];
  const { logistics, flightDuration, tzDiffMinutes: tzDiff } = data;

  // --- PRE-FLIGHT BUFFERS (all in origin-timezone minutes) ---
  const secBuf      = logistics.tsaPrecheck === 'yes' ? 60 : 90;
  const strollerBuf = logistics.stroller    === 'gate-check' ? 15 : 0;
  const bagBuf      = logistics.bags > 0 ? 15 : 0;
  const boardBuf    = 30;
  const homeDepart  = depMin - logistics.driveToAirport - secBuf - strollerBuf - bagBuf - boardBuf;

  // --- ARRIVAL TIMES ---
  // arrLocalDest: departure (origin local) + flight duration + timezone shift
  // May be > 1440 (next day) or > 2880 (two days, long-haul eastward)
  const arrLocalDest = depMin + flightDuration + tzDiff;

  const carBuf          = logistics.arrivalTransport === 'rental'  ? 45
                        : logistics.arrivalTransport === 'shuttle' ? 20 : 15;
  const hotelArriveDest = arrLocalDest + 20 + carBuf + logistics.hotelDrive; // 20 = deplaning

  // Clock time at destination (0–1439), regardless of how many days have passed
  const hotelDestClock  = ((hotelArriveDest % 1440) + 1440) % 1440;
  const isNextDayPlus   = hotelArriveDest >= 1440; // arrived on a later calendar day

  // True redeye: departure after 9 PM in origin local time
  const trulyRedeye     = depMin >= 21 * 60;

  // Late-night arrival: 10 PM – 6 AM at destination (hard regardless of timezone)
  const isLateNightArr  = hotelDestClock >= 22 * 60 || hotelDestClock < 6 * 60;

  // --- PER-CHILD SCORING ---
  data.children.forEach(child => {
    if (!child.age) return;
    const cName   = child.name;
    const wakeMin = timeToMinutes(child.wakeTime);
    const bedMin  = timeToMinutes(child.bedtime);

    // ---- OVERNIGHT / REDEYE BONUS ----
    // Only award if it's a true late-night departure (after 9 PM)
    if (trulyRedeye && data.redeyeOk) {
      const minsFromBed = depMin - bedMin;
      if (minsFromBed >= -60 && minsFromBed <= 90) {
        // Departs within 1h before or 1.5h after bedtime — sweet spot
        score += 18;
        breakdown.push({ label: `${cName}: departs near bedtime (redeye sweet spot)`, delta: 18 });
        positives.push({ text: `Departs close to ${cName}'s bedtime (${minutesToTime(bedMin)}) — ideal for sleeping through most of the flight`, delta: 18 });
      } else if (minsFromBed > 90) {
        // Too long past bedtime — overtired before boarding
        score += 5;
        breakdown.push({ label: `${cName}: departs well after bedtime (partial redeye credit)`, delta: 5 });
        warnings.push({ text: `Departs well after ${cName}'s bedtime — they may be overtired and overtired children often don't sleep well on planes`, delta: 5 });
      }
    }

    // ---- NAP-BY-NAP ANALYSIS ----
    child.naps.forEach((nap, i) => {
      const napStart = timeToMinutes(nap.start);
      const napEnd   = napStart + nap.duration;
      const napLabel = `nap ${i + 1} (${minutesToTime(napStart)})`;

      // Worst: departure lands in the middle of an established nap
      if (depMin > napStart + 15 && depMin < napEnd - 15) {
        score -= 25;
        breakdown.push({ label: `${cName}: departure is mid-${napLabel}`, delta: -25 });
        warnings.push({ text: `Departure is mid-${napLabel} for ${cName} — high risk of overtired, dysregulated child at the gate`, delta: -25 });
        return;
      }

      // Bad: driving to airport wakes child from/during nap
      if (homeDepart >= 0 && overlaps(homeDepart, depMin, napStart, napEnd)) {
        score -= 14;
        breakdown.push({ label: `${cName}: drive to airport overlaps ${napLabel}`, delta: -14 });
        warnings.push({ text: `Drive to airport overlaps ${cName}'s ${napLabel} — disrupted nap before flying is difficult`, delta: -14 });
        return;
      }

      // Best: departure aligns with nap start (child falls asleep during boarding/takeoff)
      if (depMin >= napStart - 40 && depMin <= napStart + 15) {
        score += 20;
        breakdown.push({ label: `${cName}: departure aligns with ${napLabel} start`, delta: 20 });
        positives.push({ text: `Departure aligns with ${cName}'s ${napLabel} start — likely asleep by the time you reach cruising altitude`, delta: 20 });
        if (depMin + flightDuration >= napEnd) {
          // Flight also covers the full nap — bonus
          score += 8;
          breakdown.push({ label: `${cName}: flight covers full ${napLabel} window`, delta: 8 });
          positives.push({ text: `Flight duration covers ${cName}'s full ${napLabel} window`, delta: 8 });
        }
        return;
      }

      // Good: flight window spans the nap even if departure isn't right at onset
      if (depMin <= napStart + 30 && depMin + flightDuration >= napEnd - 15) {
        score += 13;
        breakdown.push({ label: `${cName}: flight spans ${napLabel}`, delta: 13 });
        positives.push({ text: `Flight spans ${cName}'s ${napLabel} — in-flight sleep opportunity`, delta: 13 });
      }

      // Mild penalty: nap falls entirely before departure (child misses nap, boards overtired)
      if (napEnd < depMin && napEnd > homeDepart) {
        score -= 8;
        breakdown.push({ label: `${cName}: ${napLabel} ends before departure`, delta: -8 });
        warnings.push({ text: `${cName}'s ${napLabel} ends before departure — they'll board somewhat tired`, delta: -8 });
      }
    });

    // ---- HOTEL ARRIVAL vs. SCHEDULE ----

    if (isLateNightArr) {
      // Late-night hotel arrival is bad no matter what (car rental, check-in, unfamiliar room at 1 AM)
      score -= 20;
      breakdown.push({ label: 'Late-night hotel arrival', delta: -20 });
      warnings.push({ text: `Hotel arrival at ${minutesToTime(hotelDestClock)} destination time — car rental, transit, and check-in this late is extremely stressful with children`, delta: -20 });
    }

    if (!isNextDayPlus && !isLateNightArr) {
      // Same-day arrival during normal hours: compare to bedtime
      if (hotelDestClock <= bedMin - 60) {
        score += 10;
        breakdown.push({ label: `${cName}: hotel arrival well before bedtime`, delta: 10 });
        positives.push({ text: `Arrive at hotel by ${minutesToTime(hotelDestClock)} — ample time to set up sleep space before ${cName}'s bedtime`, delta: 10 });
      } else if (hotelDestClock > bedMin - 60 && hotelDestClock <= bedMin + 30) {
        score -= 8;
        breakdown.push({ label: `${cName}: hotel arrival close to bedtime`, delta: -8 });
        warnings.push({ text: `Arriving close to ${cName}'s bedtime — set up the sleep environment immediately on check-in`, delta: -8 });
      } else if (hotelDestClock > bedMin + 30) {
        score -= 20;
        breakdown.push({ label: `${cName}: hotel arrival past bedtime`, delta: -20 });
        warnings.push({ text: `Hotel arrival at ${minutesToTime(hotelDestClock)}, which is ${Math.round((hotelDestClock - bedMin) / 60 * 10) / 10}h after ${cName}'s bedtime — expect overtired behavior in an unfamiliar place`, delta: -20 });
      }
    } else if (isNextDayPlus && !isLateNightArr) {
      // Arrived morning/daytime the next day (e.g. overnight transatlantic)
      if (hotelDestClock >= wakeMin && hotelDestClock < wakeMin + 180) {
        score += 6;
        breakdown.push({ label: `${cName}: overnight flight, early morning arrival`, delta: 6 });
        positives.push({ text: `Overnight flight arrives early morning at destination — reasonable start to the first full day`, delta: 6 });
      }
    }

    // ---- BODY CLOCK MISMATCH (significant timezone shifts) ----
    // What does the child's body clock say when they arrive at the hotel?
    const bodyClockAtHotel = ((hotelArriveDest - tzDiff) % 1440 + 1440) % 1440;

    if (Math.abs(tzDiff) >= 150) { // 2.5+ hour shift worth flagging
      // Body thinks it's wake time but local time is deep night → child wired when exhausted
      const nearWake = bodyClockAtHotel >= wakeMin - 45 && bodyClockAtHotel <= wakeMin + 90;
      if (nearWake && isLateNightArr) {
        score -= 12;
        breakdown.push({ label: `${cName}: body clock mismatch — body thinks it's morning`, delta: -12 });
        warnings.push({ text: `${cName}'s body clock will feel like morning (~${minutesToTime(wakeMin)}) when you arrive at the hotel at ${minutesToTime(hotelDestClock)} local time — they may be wired despite the late hour`, delta: -12 });
      }

      // Body thinks it's bedtime but local is midday → early crash, then 3 AM wake-up
      const nearBed = bodyClockAtHotel >= bedMin - 45 && bodyClockAtHotel <= bedMin + 60;
      if (nearBed && hotelDestClock >= 11 * 60 && hotelDestClock <= 16 * 60) {
        score -= 10;
        breakdown.push({ label: `${cName}: body clock mismatch — body thinks it's bedtime at midday`, delta: -10 });
        warnings.push({ text: `${cName}'s body will feel like bedtime (~${minutesToTime(bedMin)}) at ${minutesToTime(hotelDestClock)} local time — they may crash for a "nap" that turns into a full night, then wake at 3 AM`, delta: -10 });
      }
    }

    // ---- MODIFIERS ----
    if (child.carSleep === 'yes' && logistics.hotelDrive >= 30) {
      score += 5;
      breakdown.push({ label: `${cName}: sleeps in car (hotel drive recovery)`, delta: 5 });
      positives.push({ text: `${cName} sleeps in the car — the hotel drive could double as recovery nap time`, delta: 5 });
    }
    if (child.planeSleep === 'yes' && flightDuration >= 90) {
      score += 5;
      breakdown.push({ label: `${cName}: sleeps reliably on planes`, delta: 5 });
      positives.push({ text: `${cName} sleeps reliably on planes — good confidence in in-flight rest`, delta: 5 });
    }
    if (child.needs.includes('contact') && flightDuration > 90) {
      score -= 5;
      breakdown.push({ label: `${cName}: contact napper on long flight`, delta: -5 });
      warnings.push({ text: `${cName} is a contact napper — plan to hold them for much of the flight`, delta: -5 });
    }
    if (child.needs.includes('sensory')) {
      // Informational only — no score change, but tracked
      warnings.push({ text: `${cName} has sensory sensitivities — noise-canceling headphones and familiar items are essential`, delta: 0 });
    }
    // Nursing tip (informational, no score change)
    if (child.needs.includes('nursing') || ['0-3mo','3-6mo','6-9mo'].includes(child.age)) {
      positives.push({ text: `Tip: nurse or offer a bottle to ${cName} during descent — swallowing equalizes ear pressure`, delta: 0 });
    }
  });

  // ---- JET LAG PENALTY ----
  const tzAbsHours = Math.abs(tzDiff) / 60;
  if (tzAbsHours >= 4) {
    score -= 8;
    breakdown.push({ label: `${tzAbsHours}h time zone shift jet lag penalty`, delta: -8 });
    warnings.push({ text: `${tzAbsHours}h time zone shift — plan for ~${Math.ceil(tzAbsHours)} nights of disrupted sleep on arrival`, delta: -8 });
  }
  if (tzDiff > 0 && tzAbsHours >= 3) {
    score -= 5;
    breakdown.push({ label: 'Eastward travel jet lag penalty', delta: -5 });
    warnings.push({ text: 'Eastward travel makes jet lag significantly harder for children — shift bedtime earlier by 15 min/day for 4–5 days before departure', delta: -5 });
  }

  // ---- REDEYE FILTER ----
  if (!data.redeyeOk && trulyRedeye) {
    score -= 40;
    breakdown.push({ label: 'Redeye not preferred (late departure penalty)', delta: -40 });
    warnings.push({ text: 'Redeye departure — you indicated you prefer to avoid these', delta: -40 });
  }

  // ---- HOME DEPARTURE TIMING ----
  if (homeDepart < 0) {
    score -= 30;
    breakdown.push({ label: 'Middle-of-night home departure', delta: -30 });
    warnings.push({ text: `This departure requires leaving home at ${minutesToTime(homeDepart + 1440)} — middle of the night`, delta: -30 });
  } else if (homeDepart < 5 * 60) {
    score -= 15;
    breakdown.push({ label: 'Very early home departure', delta: -15 });
    warnings.push({ text: `Leaving home at ${minutesToTime(homeDepart)} — very early start for children`, delta: -15 });
  }

  score = Math.max(0, Math.min(100, score));
  return { score, positives, warnings, breakdown, homeDepart, hotelArriveDest, hotelDestClock, arrLocalDest, isNextDayPlus };
}

// ============ GENERATE WINDOWS ============
function generateFlightWindows(data) {
  const scored = [];
  // Score every 15-min slot from 5 AM to 11:45 PM
  for (let depMin = 300; depMin <= 1425; depMin += 15) {
    scored.push({ depMin, ...scoreWindow(depMin, data) });
  }

  // Pick top windows that are at least 120 min apart from each other
  const sorted = [...scored].sort((a, b) => b.score - a.score);
  const top = [];
  for (const candidate of sorted) {
    if (top.length >= 5) break;
    if (!top.some(w => Math.abs(candidate.depMin - w.depMin) < 120)) {
      top.push(candidate);
    }
  }
  return top.sort((a, b) => b.score - a.score); // return ranked best-first
}

// ============ RUN ANALYSIS ============
async function runAnalysis() {
  if (!selectedDurationMinutes) {
    alert('Please select your approximate flight duration.');
    return;
  }
  if (!collectChildData(0).age) {
    alert('Please go back to Step 1 and select an age for your child.');
    return;
  }

  const data    = collectFormData();
  window._lastAnalysisData = data;

  // Show results section with spinner while we try to fetch live flights
  document.getElementById('results-section').classList.remove('hidden');
  document.getElementById('napnav-form').classList.add('hidden');
  document.querySelector('.progress-container').classList.add('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });

  const resultsContainer = document.getElementById('results-container');
  resultsContainer.innerHTML = `
    <div class="loading-spinner-wrap">
      <div class="spinner"></div>
      <span>Looking up flights for ${lookupAirport(data.trip.depAirport)?.code || '?'} → ${lookupAirport(data.trip.arrAirport)?.code || '?'}${data.trip.depDate ? ' on ' + data.trip.depDate : ''}...</span>
    </div>`;
  document.getElementById('hero-rec-container').innerHTML = '';
  document.getElementById('tension-container').innerHTML  = '';

  // Attempt live flight fetch
  let liveFlights = null;
  const depA = lookupAirport(data.trip.depAirport);
  const arrA = lookupAirport(data.trip.arrAirport);
  if (depA && arrA && data.trip.depDate) {
    liveFlights = await fetchLiveFlights(depA.code, arrA.code, data.trip.depDate);
  }

  const windows = generateFlightWindows(data);
  const allWindows = [];
  for (let depMin = 300; depMin <= 1410; depMin += 30) {
    allWindows.push({ depMin, ...scoreWindow(depMin, data) });
  }

  renderResults(windows, data, allWindows, liveFlights);
}

// ============ RENDER RESULTS ============
function renderResults(ranked, data, allWindows, liveFlights) {
  const container = document.getElementById('results-container');
  container.innerHTML = '';

  const depA = lookupAirport(data.trip.depAirport);
  const arrA = lookupAirport(data.trip.arrAirport);
  const route = depA && arrA ? `${depA.city.split(',')[0]} → ${arrA.city.split(',')[0]}` : 'your route';
  const childNames = data.children.map(c => c.name).join(' & ');
  document.getElementById('results-subtitle').textContent =
    `${ranked.length} best departure windows for ${childNames} — ${route}`;

  // Hero card
  buildHeroCard(ranked, data);

  // Scoring FAQ
  renderScoringFaq();

  // Multi-child tension
  renderTensionSection(data);

  // Live flight notice / results
  const noticeContainer = document.getElementById('live-flight-notice-container');
  if (noticeContainer) noticeContainer.innerHTML = '';

  if (liveFlights && liveFlights.length) {
    // Score and render real flights
    if (noticeContainer) {
      noticeContainer.innerHTML = `<div class="live-flight-notice">✈️ Showing <strong>${liveFlights.length} live flight${liveFlights.length !== 1 ? 's' : ''}</strong> for this route on ${data.trip.depDate}, scored by nap algorithm.</div>`;
    }
    const scoredFlights = liveFlights.map(f => {
      const depMin  = parseISOToMinutes(f.depSched);
      const durMins = parseISODurationMinutes(f.depSched, f.arrSched) || data.flightDuration;
      const overrideData = { ...data, flightDuration: durMins };
      const scored  = scoreWindow(depMin, overrideData);
      return { ...f, depMin, durMins, ...scored };
    }).sort((a, b) => b.score - a.score);

    scoredFlights.forEach((f, i) => {
      container.appendChild(buildLiveFlightCard(f, i + 1, data));
    });
  } else {
    // Fallback: show hypothetical windows
    if (liveFlights !== null && noticeContainer) {
      noticeContainer.innerHTML = `<div class="live-flight-notice">Showing estimated windows — live flight data unavailable for this route</div>`;
    }
    ranked.forEach((result, i) => container.appendChild(buildWindowCard(result, i + 1, data)));
  }

  renderChecklist(data);
  renderTips(data);
  renderExploreTimeline(allWindows, data);
}

function buildWindowCard(result, rank, data) {
  const { score, positives, warnings, depMin, homeDepart, hotelArriveDest, hotelDestClock, isNextDayPlus } = result;
  const { text: scoreText, cls: scoreCls } = scoreLabel(score);
  const medals     = ['🥇','🥈','🥉','4th','5th'];
  const rankLabels = ['Best Window','Second Choice','Third Choice','Fourth Choice','Fifth Choice'];

  // Show a ±60 min window around the scored departure minute
  const windowStart = depMin - 60;
  const windowEnd   = depMin + 60;
  const hrs  = Math.floor(data.flightDuration / 60);
  const mins = data.flightDuration % 60;
  const durationLabel = `${hrs}h${mins > 0 ? ' ' + mins + 'm' : ''}`;
  const hotelArriveDisplay = `${minutesToTime(hotelDestClock)}${isNextDayPlus ? ' (+1 day)' : ''}`;

  const sublabel = generateSublabel(score, positives, warnings);
  const childInds = data.children.length > 1
    ? `<div class="child-indicators">${data.children.map(c => renderChildIndicators(c, depMin, data.flightDuration)).join('')}</div>`
    : '';

  const card = document.createElement('div');
  card.className = `result-card rank-${Math.min(rank, 3)}`;
  card.innerHTML = `
    <div class="result-card-header">
      <div class="rank-badge">
        <span class="rank-medal">${medals[rank-1] || '✈️'}</span>
        <div>
          <div class="rank-title">${rankLabels[rank-1] || `Option ${rank}`}</div>
          <div class="window-time-display">
            Look for flights departing between<br>
            <strong>${minutesToTime(windowStart)} — ${minutesToTime(windowEnd)}</strong>
          </div>
          ${childInds}
        </div>
      </div>
      <div class="score-display">
        <div class="score-number score-${scoreCls}">${score}</div>
        <div class="score-label">Family Score</div>
        <div class="score-bar-wrap">
          <div class="score-bar-fill fill-${scoreCls}" style="width:${score}%"></div>
        </div>
        <div style="font-size:11px;color:var(--text-muted);margin-top:4px;font-weight:600;">${scoreText}</div>
      </div>
    </div>
    <div style="font-size:12px;font-style:italic;color:var(--text-muted);margin-bottom:12px;">${sublabel}</div>

    <div class="journey-summary">
      <div class="journey-step">
        <span class="journey-icon">🏠</span>
        <div>
          <div class="journey-label">Leave Home</div>
          <div class="journey-time">${homeDepart < 0 ? '⚠️ Middle of night' : minutesToTime(homeDepart)}</div>
        </div>
      </div>
      <div class="journey-arrow">→</div>
      <div class="journey-step">
        <span class="journey-icon">✈️</span>
        <div>
          <div class="journey-label">Depart Window</div>
          <div class="journey-time">${minutesToTime(windowStart)} – ${minutesToTime(windowEnd)}</div>
        </div>
      </div>
      <div class="journey-arrow">→</div>
      <div class="journey-step">
        <span class="journey-icon">⏱</span>
        <div>
          <div class="journey-label">Flight</div>
          <div class="journey-time">${durationLabel}</div>
        </div>
      </div>
      <div class="journey-arrow">→</div>
      <div class="journey-step">
        <span class="journey-icon">🏨</span>
        <div>
          <div class="journey-label">Hotel Arrival</div>
          <div class="journey-time">${hotelArriveDisplay}</div>
        </div>
      </div>
    </div>

    <div class="insights-grid">
      <div class="insights-col">
        <h4 style="color:var(--success);">✓ Why This Works</h4>
        ${positives.length
          ? positives.map(p => `<div class="insight-item"><span class="insight-icon">✅</span><span>${p.text}</span><span class="score-delta-badge delta-pos">+${p.delta}</span></div>`).join('')
          : '<div class="insight-item"><span>No standout positives for this window</span></div>'}
      </div>
      <div class="insights-col">
        <h4 style="color:var(--warning);">⚠ Watch Out For</h4>
        ${warnings.length
          ? warnings.map(w => `<div class="insight-item"><span class="insight-icon">⚠️</span><span>${w.text}</span><span class="score-delta-badge delta-neg">${w.delta}</span></div>`).join('')
          : '<div class="insight-item"><span class="insight-icon">✅</span><span>No major concerns for this window</span></div>'}
      </div>
    </div>`;
  return card;
}

function buildLiveFlightCard(flight, rank, data) {
  const { score, positives, warnings, depMin, homeDepart, hotelDestClock, isNextDayPlus, durMins, airline, flightNum, depSched, arrSched } = flight;
  const { text: scoreText, cls: scoreCls } = scoreLabel(score);
  const sublabel = generateSublabel(score, positives, warnings);

  const depTimeStr = depSched ? new Date(depSched).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }) : minutesToTime(depMin);
  const arrTimeStr = arrSched ? new Date(arrSched).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }) : '—';
  const hrs  = Math.floor(durMins / 60);
  const mins = durMins % 60;
  const durLabel = `${hrs}h${mins > 0 ? ' ' + mins + 'm' : ''}`;
  const hotelDisplay = `${minutesToTime(hotelDestClock)}${isNextDayPlus ? ' (+1d)' : ''}`;

  // Per-child indicators
  const childInds = data.children.length > 1
    ? `<div class="child-indicators">${data.children.map(c => renderChildIndicators(c, depMin, durMins)).join('')}</div>`
    : '';

  const card = document.createElement('div');
  card.className = `live-flight-card rank-${Math.min(rank, 3)}`;
  card.innerHTML = `
    <div class="live-flight-header">
      <div>
        <div class="live-flight-airline">${airline}${flightNum ? ' · ' + flightNum : ''} ${rank === 1 ? '🥇' : ''}</div>
        <div class="live-flight-times">
          <span>${depTimeStr}</span>
          <span class="live-flight-arrow">→</span>
          <span>${arrTimeStr}</span>
          <span class="live-flight-duration">${durLabel}</span>
        </div>
        <div style="font-size:12px;color:var(--text-muted);">Hotel ~${hotelDisplay} · Leave home ~${homeDepart < 0 ? '⚠️ midnight' : minutesToTime(homeDepart)}</div>
        ${childInds}
      </div>
      <div class="score-display">
        <div class="score-number score-${scoreCls}">${score}</div>
        <div class="score-label">Nap Score</div>
        <div class="score-bar-wrap"><div class="score-bar-fill fill-${scoreCls}" style="width:${score}%"></div></div>
        <div style="font-size:11px;color:var(--text-muted);margin-top:4px;font-weight:600;">${scoreText}</div>
      </div>
    </div>
    <div style="font-size:12px;font-style:italic;color:var(--text-muted);margin-bottom:10px;">${sublabel}</div>
    <div class="insights-grid">
      <div class="insights-col">
        <h4 style="color:var(--success);">✓ Why This Works</h4>
        ${positives.length
          ? positives.map(p => `<div class="insight-item"><span class="insight-icon">✅</span><span>${p.text}</span></div>`).join('')
          : '<div class="insight-item"><span style="color:var(--text-muted)">No standout positives</span></div>'}
      </div>
      <div class="insights-col">
        <h4 style="color:var(--warning);">⚠ Watch Out For</h4>
        ${warnings.length
          ? warnings.map(w => `<div class="insight-item"><span class="insight-icon">⚠️</span><span>${w.text}</span></div>`).join('')
          : '<div class="insight-item"><span class="insight-icon">✅</span><span>No major concerns</span></div>'}
      </div>
    </div>`;
  return card;
}

// ============ EXPLORE TIMELINE ============
function renderExploreTimeline(allWindows, data) {
  const section = document.getElementById('explore-section');
  if (!section) return;

  // Build heatmap
  const heatmap = document.getElementById('explore-heatmap');
  heatmap.innerHTML = '';

  // Time labels
  const labelRow = document.getElementById('explore-labels');
  labelRow.innerHTML = '';

  allWindows.forEach((w, i) => {
    const block = document.createElement('div');
    block.className = 'heatmap-block';
    block.dataset.depMin = w.depMin;
    block.title = `${minutesToTime(w.depMin)} — Score: ${w.score}`;

    // Color by score
    let color;
    if (w.score >= 70) color = '#10B981'; // green
    else if (w.score >= 55) color = '#34D399'; // light green
    else if (w.score >= 40) color = '#F59E0B'; // yellow
    else if (w.score >= 25) color = '#F97316'; // orange
    else color = '#EF4444'; // red

    block.style.background = color;
    block.addEventListener('click', () => showWindowDetail(w.depMin, data, allWindows));
    heatmap.appendChild(block);
  });

  // Add time labels every 2 hours
  const timeLabels = [300, 420, 540, 660, 780, 900, 1020, 1140, 1260, 1380];
  timeLabels.forEach(t => {
    const pct = (t - 300) / (1410 - 300) * 100;
    const lbl = document.createElement('span');
    lbl.className = 'heatmap-label';
    lbl.style.left = pct + '%';
    lbl.textContent = minutesToTime(t).replace(':00 ', ' ').replace(':30 ', ':30 ');
    labelRow.appendChild(lbl);
  });

  section.classList.remove('hidden');
}

function showWindowDetail(depMin, data, allWindows) {
  // Highlight selected block
  document.querySelectorAll('.heatmap-block').forEach(b => b.classList.remove('selected'));
  const selectedBlock = document.querySelector(`.heatmap-block[data-dep-min="${depMin}"]`);
  if (selectedBlock) selectedBlock.classList.add('selected');

  const result = allWindows.find(w => w.depMin === depMin);
  if (!result) return;

  const panel = document.getElementById('explore-detail-panel');
  const windowStart = depMin - 60;
  const windowEnd   = depMin + 60;
  const { score, positives, warnings, homeDepart, hotelArriveDest, hotelDestClock, isNextDayPlus } = result;
  const { text: scoreText, cls: scoreCls } = scoreLabel(score);
  const hotelDisplay = `${minutesToTime(hotelDestClock)}${isNextDayPlus ? ' (+1 day)' : ''}`;
  const flightHrs = Math.floor(data.flightDuration / 60);
  const flightMins = data.flightDuration % 60;

  panel.innerHTML = `
    <div class="explore-detail-inner">
      <div class="explore-detail-header">
        <div>
          <div class="explore-detail-time">${minutesToTime(windowStart)} — ${minutesToTime(windowEnd)}</div>
          <div class="explore-detail-sub">Leave home ~${homeDepart < 0 ? '⚠️ middle of night' : minutesToTime(homeDepart)} &nbsp;·&nbsp; Hotel ~${hotelDisplay}</div>
        </div>
        <div class="score-display">
          <div class="score-number score-${scoreCls}">${score}</div>
          <div class="score-label">Score</div>
          <div class="score-bar-wrap"><div class="score-bar-fill fill-${scoreCls}" style="width:${score}%"></div></div>
          <div style="font-size:11px;color:var(--text-muted);margin-top:4px;font-weight:600;">${scoreText}</div>
        </div>
      </div>
      <div class="insights-grid" style="margin-top:12px;">
        <div class="insights-col">
          <h4 style="color:var(--success);">✓ What Works</h4>
          ${positives.length
            ? positives.map(p => `<div class="insight-item"><span class="insight-icon">✅</span><span>${p.text}</span><span class="score-delta-badge delta-pos">+${p.delta}</span></div>`).join('')
            : '<div class="insight-item"><span style="color:var(--text-muted);font-size:13px;">Nothing notable</span></div>'}
        </div>
        <div class="insights-col">
          <h4 style="color:var(--warning);">⚠ Watch Out For</h4>
          ${warnings.length
            ? warnings.map(w => `<div class="insight-item"><span class="insight-icon">⚠️</span><span>${w.text}</span><span class="score-delta-badge delta-neg">${w.delta}</span></div>`).join('')
            : '<div class="insight-item"><span class="insight-icon">✅</span><span>No major concerns</span></div>'}
        </div>
      </div>
    </div>`;
  panel.classList.remove('hidden');
  panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ============ CHECKLIST ============
function renderChecklist(data) {
  const { children, logistics, tzDiffMinutes: tzDiff } = data;
  const allNeeds = [...new Set(children.flatMap(c => c.needs))];
  const sections = [];

  const hotelItems = [];
  if (logistics.cribAvailable    === 'unknown') hotelItems.push({ text: 'Call hotel to confirm pack-n-play / crib availability', urgent: true });
  if (logistics.blackoutAvailable=== 'unknown') hotelItems.push({ text: 'Ask about blackout curtains — or pack portable blackout blind (GRO Anywhere Blind, Slumberpod)', urgent: false });
  hotelItems.push({ text: 'Request early check-in if arriving during nap time', urgent: false });
  hotelItems.push({ text: 'Request a quiet room — away from elevator, ice machine, or street noise', urgent: false });
  if (logistics.arrivalTransport === 'rental') hotelItems.push({ text: 'Pre-book rental car + join loyalty club to skip counter (saves 30–40 min)', urgent: true });
  sections.push({ title: 'Confirm Before You Go', items: hotelItems });

  const sleepPack = [];
  if (allNeeds.includes('white-noise')) sleepPack.push({ text: 'Download white noise app + bring a portable Bluetooth speaker or LectroFan', urgent: false });
  if (allNeeds.includes('blackout'))    sleepPack.push({ text: 'Pack portable blackout curtains (GRO Anywhere Blind, blackout clips, or Slumberpod for pack-n-play)', urgent: true });
  if (allNeeds.includes('nursing'))     sleepPack.push({ text: 'Nursing cover and extra nursing pads in carry-on', urgent: false });
  if (allNeeds.includes('pacifier'))    sleepPack.push({ text: 'Pack 3+ pacifiers — they fall on airplane floors frequently', urgent: true });
  if (allNeeds.includes('lovey'))       sleepPack.push({ text: 'Lovey/comfort object in carry-on — never check it', urgent: true });
  if (allNeeds.includes('contact'))     sleepPack.push({ text: 'Baby carrier/wrap for hands-free holding through the airport and on the plane', urgent: false });
  if (allNeeds.includes('sensory'))     sleepPack.push({ text: 'Toddler noise-canceling headphones (Puro Sound, Baby Banz)', urgent: true });
  if (allNeeds.includes('medical'))     sleepPack.push({ text: 'Medical equipment + documentation in carry-on — never check', urgent: true });
  sleepPack.push({ text: 'Pack sleep sack or blanket from home — familiar scents help in new environments', urgent: false });
  sections.push({ title: 'Pack for Sleep Success', items: sleepPack });

  const airportItems = [
    { text: 'Arrive airport 2.5–3 hours early — not 2 — when traveling with young children', urgent: true },
    { text: 'Look up your gate for a children\'s play area (major airports: ATL, ORD, DFW, LAX, JFK all have them)', urgent: false },
    { text: 'Bring your own snacks — airport food lines waste precious nap-window time', urgent: false },
    { text: 'Pack a change of clothes for each child in the carry-on (minimum)', urgent: false },
  ];
  if (logistics.stroller === 'gate-check') airportItems.push({ text: 'Gate-check stroller at the jet bridge door — ask for a tag immediately on boarding', urgent: false });
  if (logistics.stroller === 'gate-check') airportItems.push({ text: 'Request a gate check bag from the airline to protect the seat', urgent: false });
  if (logistics.stroller === 'gate-check') airportItems.push({ text: 'Tag your stroller with your name and phone number in case it\'s misrouted', urgent: false });
  if (logistics.carSeat  === 'plane')      airportItems.push({ text: 'Car seat on plane: FAA-approved only — book a separate window seat (car seats cannot go in aisle seats)', urgent: true });
  if (logistics.carSeat  === 'gate-check') airportItems.push({ text: 'Request a gate check bag to protect your car seat', urgent: false });
  if (numChildren > 1) airportItems.push({ text: 'Board early — airlines typically board families with young children before general boarding. Confirm with your airline.', urgent: false });
  sections.push({ title: 'Airport Day', items: airportItems });

  // Long flight items
  const flightHrs = data.flightDuration / 60;
  if (flightHrs >= 6) {
    sections.push({ title: 'Long-Haul Preparation (6+ hours)', items: [
      { text: 'Request a bassinet/bulkhead seat at booking — call the airline directly, limited availability', urgent: true },
      { text: 'Pack a full change of clothes per child in carry-on (and one for yourself)', urgent: true },
    ]});
  }

  // Infant-specific items
  const hasInfantForChecklist = children.some(c => ['0-3mo','3-6mo','6-9mo','9-12mo'].includes(c.age));
  if (hasInfantForChecklist) {
    sections.push({ title: 'Infant Travel', items: [
      { text: 'Pack formula/milk for flight duration + 2 hours buffer', urgent: true },
      { text: 'Nursing or feeding during takeoff and landing reduces ear pressure', urgent: false },
      { text: 'TSA allows formula and breast milk over 3oz — declare at checkpoint', urgent: false },
    ]});
  }

  // Redeye + young child
  const hasYoungChild = children.some(c => ['0-3mo','3-6mo','6-9mo','9-12mo','12-18mo','18-24mo','2-3yr'].includes(c.age));
  if (data.redeyeOk && hasYoungChild) {
    sections.push({ title: 'Overnight Flight Tips', items: [
      { text: 'Keep the pre-flight routine identical to your home bedtime — same book, same song, same words', urgent: false },
    ]});
  }

  const tzAbsH = Math.abs(tzDiff) / 60;
  if (tzAbsH >= 2) {
    const dir = tzDiff > 0 ? 'east' : 'west';
    sections.push({ title: `Jet Lag Prep (${tzAbsH}h time zone shift)`, items: [
      { text: `Shift bedtime 15–20 min/day in the ${dir}ward direction for 4–5 days before travel`, urgent: false },
      { text: `Expect ~${Math.ceil(tzAbsH)} nights of disrupted sleep on arrival — plan accordingly`, urgent: false },
      { text: 'Get outside in morning daylight on arrival — the strongest circadian reset available', urgent: false },
      { text: 'Keep your exact bedtime routine (bath → PJs → book → song → sleep) in the hotel', urgent: false },
      ...(tzDiff > 0 ? [{ text: 'Eastward: avoid bright light in the late evening on arrival — it delays adjustment', urgent: false }] : []),
    ]});
    if (tzAbsH > 3) {
      sections.push({ title: 'Pre-Departure Schedule Shift', items: [
        { text: 'Shift nap time by 15 minutes per day, 3–4 days before departure', urgent: false },
        { text: 'Expose your child to natural light at the destination\'s morning time on arrival day — fastest reset for the body clock', urgent: false },
      ]});
    }
  }

  document.getElementById('checklist-container').innerHTML = sections.map(s => `
    <div class="checklist-section">
      <h4>${s.title}</h4>
      ${s.items.map(item => `
        <div class="checklist-item ${item.urgent ? 'important' : ''}">
          <input type="checkbox">
          <span>${item.urgent ? '⚠️ ' : ''}${item.text}</span>
        </div>`).join('')}
    </div>`).join('');
}

// ============ TIPS ============
function renderTips(data) {
  const { children, logistics, tzDiffMinutes: tzDiff } = data;
  const hasInfant    = children.some(c => ['0-3mo','3-6mo','6-9mo','9-12mo'].includes(c.age));
  const hasToddler   = children.some(c => ['12-18mo','18-24mo','2-3yr'].includes(c.age));
  const hasPreschool = children.some(c => ['3-4yr','4-5yr','5+yr'].includes(c.age));
  const hasNursing   = children.some(c => c.needs.includes('nursing'));
  const tips = [];

  if (hasInfant || hasNursing) {
    tips.push({ icon: '👂', title: 'Ear Pressure on Descent',
      body: 'Descent causes more ear pain than ascent. Nurse, offer a bottle, or give a pacifier starting 20 minutes before landing. For older toddlers, have them chew snacks. The swallowing motion equalizes the Eustachian tube and prevents the painful pressure buildup.' });
  }
  tips.push({ icon: '🛏', title: 'Set Up Sleep Space the Moment You Arrive',
    body: 'Before unpacking anything else, set up the sleep environment: blackout curtains up, white noise running, pack-n-play in the darkest corner. This signals to your child that sleep is coming, even in an unfamiliar room.' });
  tips.push({ icon: '⏰', title: 'Keep the Bedtime Routine Identical',
    body: 'Your child\'s body doesn\'t recognize the hotel room, but it does recognize bath → pajamas → book → song → sleep. Do it in exactly the same order at the same pace as home. This is your most powerful sleep tool in a new environment.' });
  if (Math.abs(tzDiff) / 60 >= 2) {
    tips.push({ icon: '☀️', title: 'Use Morning Daylight to Reset the Clock',
      body: 'Light is the strongest biological time signal that exists. Get outside in the morning daylight of your destination on day 1. Even 20–30 minutes of outdoor light in the morning accelerates circadian adjustment significantly, especially for toddlers.' });
  }
  if (hasToddler) {
    tips.push({ icon: '🎒', title: 'Toddler Carry-On Survival Kit',
      body: 'Pack new small toys and reveal one per hour to maintain novelty. Include sticker books, play-doh, a loaded tablet with offline content, favorite snacks, a comfort item, extra clothes, and wipes. Toddlers are unpredictable — always over-prepare the carry-on.' });
  }
  if (hasPreschool) {
    tips.push({ icon: '🗺️', title: 'Prepare Preschoolers with a "Travel Story"',
      body: 'Days before the trip, walk them through the whole narrative: "First we drive to the airport. Then we check our bags. Then we go through security where they scan our shoes..." Predictability reduces anxiety and dramatically decreases meltdowns on travel day.' });
  }
  tips.push({ icon: '🚪', title: 'Board Early, Set Up Before the Rush',
    body: 'Most airlines board families with young children during early boarding. Use this window: install car seats, stow bags, arrange child supplies within arm\'s reach, and let your child explore the seat before the aisle fills. Having an organized setup prevents panicked searching mid-flight.' });
  tips.push({ icon: '💊', title: 'Medication Timing Across Time Zones',
    body: 'If your child takes any scheduled medication, pre-calculate the correct administration time in the destination time zone and write it down. Never use diphenhydramine (Benadryl) as a sleep aid — it causes paradoxical hyperactivity in a significant minority of young children.' });
  if (logistics.arrivalTransport === 'rental') {
    tips.push({ icon: '🚗', title: 'Car Rental Strategy with Kids',
      body: 'Join the loyalty club of your rental company (free, takes 2 minutes online) to skip the counter and go straight to your car. Pre-book and pre-pay including car seat rental if needed. Budget 45–60 minutes from baggage claim to driving away at domestic airports, 60–90 at international.' });
  }

  document.getElementById('tips-container').innerHTML = tips.map(t => `
    <div class="tip-item">
      <span class="tip-icon">${t.icon}</span>
      <div class="tip-content"><strong>${t.title}</strong><p>${t.body}</p></div>
    </div>`).join('');
}

// ============ START OVER ============
function startOver() {
  document.getElementById('results-section').classList.add('hidden');
  document.getElementById('napnav-form').classList.remove('hidden');
  document.querySelector('.progress-container').classList.remove('hidden');
  document.getElementById('hero-rec-container').innerHTML = '';
  document.getElementById('tension-container').innerHTML  = '';
  const noticeEl = document.getElementById('live-flight-notice-container');
  if (noticeEl) noticeEl.innerHTML = '';
  priorityChildIndex = -1;
  window._lastAnalysisData = null;
  goToStep(1);
}
