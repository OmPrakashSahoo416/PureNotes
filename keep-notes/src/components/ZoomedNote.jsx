function ZoomedNote({title, textBody}) {
  return (
    <>
      <div className="zoomedNote  overflow-y-scroll w-full h-full">
        <p className="mb-3 font-['Calibri']  outline-none text-lg font-semibold text-amber-700">
          {title}
        </p>
        <p className="leading-relaxed font-['Calibri'] overflow-x-hidden text-md  outline-none  text-slate-800">
          {textBody}
        </p>
      </div>
    </>
  );
}
export default ZoomedNote;
