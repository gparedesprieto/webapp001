import Form from 'next/form'
 
export default function Page() {
  return (
    <Form action="/search">
      {/* On submission, the input value will be appended to
          the URL, e.g. /search?query=abc */}
      <input name="query1" placeholder='Apellido' />
      <input name="query2" placeholder='Nombre' />
      <input name="query3" placeholder='Email' />
      <button type="submit">Submit</button>
    </Form>
  )
}