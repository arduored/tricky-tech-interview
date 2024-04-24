export default function Info() {
  return (
    <div className=" flex flex-col justify-between gap-4 w-full mt-20">
      <details>
        <summary className="text-lg my-3">
          <strong>Some info about the BURNOUT</strong>
        </summary>
        <p>
          In France, about <strong>480 000</strong> people are in psycholigical
          distress and the burnout would concern around 7% of them.
        </p>
      </details>
      <details>
        <summary className="text-lg my-3">
          <strong>You might notice</strong>
        </summary>
        <ul>
          <li>
            <strong>On a emotional level </strong>: the burnout is often the
            root of anxiety, apprehension and sadness
          </li>
          <li>
            <strong>On a somatic level </strong>: stress may generates back
            pains, headhaches, sleep disruptions or vertigos
          </li>
          <li>
            <strong>On a congnitiv level </strong>: Employee experiencing
            professional burnout is no longer able to carry out their missions
          </li>
          <li>
            <strong>On a behaviorial level </strong>: we can notice isolation
            and withdrawal
          </li>
        </ul>
      </details>
      <details>
        <summary className="text-lg my-3">
          <strong>Infographics by opinionway</strong>
        </summary>
        <iframe
          src="doc/infographics.pdf?zoom=50"
          className="w-full border h-screen"
        />
      </details>
    </div>
  );
}
