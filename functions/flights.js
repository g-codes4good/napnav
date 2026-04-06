const AVIATION_API_KEY = '2f01db8faf80f1ac82c6175571b2d5fa';
const AVIATION_BASE = 'http://api.aviationstack.com/v1/flights';

export async function onRequestGet(context) {
  const { searchParams } = new URL(context.request.url);
  const dep_iata = searchParams.get('dep_iata');
  const arr_iata = searchParams.get('arr_iata');
  const flight_date = searchParams.get('flight_date');

  const corsHeaders = {
    'Access-Control-Allow-Origin': 'https://nap-n-fly.pages.dev',
    'Access-Control-Allow-Methods': 'GET',
    'Content-Type': 'application/json',
  };

  if (!dep_iata || !arr_iata || !flight_date) {
    return new Response(JSON.stringify({ error: 'Missing required params' }), { status: 400, headers: corsHeaders });
  }

  try {
    const url = `${AVIATION_BASE}?access_key=${AVIATION_API_KEY}&dep_iata=${dep_iata}&arr_iata=${arr_iata}&flight_date=${flight_date}&flight_status=scheduled`;
    const res = await fetch(url);
    const json = await res.json();
    return new Response(JSON.stringify(json), { status: 200, headers: corsHeaders });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Upstream fetch failed' }), { status: 502, headers: corsHeaders });
  }
}
