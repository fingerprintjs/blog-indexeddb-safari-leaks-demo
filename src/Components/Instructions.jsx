export default function Instructions() {
  return (
    <section>
      <details open>
        <summary>Instructions</summary>
        <p>
          Click any URL below to open the affected website in a new tab. Keep the new tab open, switch back to this tab
          and you will see that the visited website is known to this demo page.
        </p>
        <p>
          In Private Safari windows, browse to affected websites within the same tab. After returning to this demo page,
          you will see that your recent browsing history is known to this page via the leak.
        </p>
      </details>
    </section>
  )
}
