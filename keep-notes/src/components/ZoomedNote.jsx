function ZoomedNote({title, textBody}) {
  return (
    <>
      <div className="zoomedNote  overflow-y-scroll w-full h-full">
        <p className="mb-3  outline-none text-lg font-semibold text-amber-700">
          {title}
        </p>
        <p className="leading-relaxed overflow-x-hidden text-sm  outline-none font-sans  text-slate-800">
          {textBody}
        </p>
      </div>
    </>
  );
}
export default ZoomedNote;
