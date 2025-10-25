
export const Projects =() => {
  return (
    <div className='flex flex-col px-2'>
      <section className="my-2">
        <div>
          <h5 className="font-bold text-[#ffffff]">Overtime Filing</h5>
          <ul className="list-disc pl-5">
            <li className="list-item">
              <p><span className="font-bold">Role: </span>Feature Developer</p>
            </li>
            <li className="list-item">
              <p><span className="font-bold">Duration: </span>1 month</p>
            </li>
            <li className="list-item">
              <p>
                <span className="font-bold">Contribution: </span> 
                Optimized utility functions. Added overtime checker to distinguish an actual overtime from a late overtime.
              </p>
            </li>
          </ul>
        </div>
        <div className='px-6 pt-4 pb-2 text-end'>
          <span className="inline-block bg-orange-900 rounded-full px-3 py-1 text-sm font-semibold text-gray-300 mr-2 mb-2"> 
            C#
          </span>
          <span className="inline-block bg-orange-900 rounded-full px-3 py-1 text-sm font-semibold text-gray-300 mr-2 mb-2"> 
            .NET
          </span>
          <span className="inline-block bg-orange-900 rounded-full px-3 py-1 text-sm font-semibold text-gray-300 mr-2 mb-2"> 
            Excel Interop
          </span>
        </div>
      </section>
      <hr />

      {/*  */}
      <section className="my-2">
        <div>
          <h5 className="font-bold text-[#ffffff]">Progress Management</h5>
          <ul className="list-disc pl-5">
            <li className="list-item">
              <p><span className="font-bold">Role: </span>Feature Developer</p>
            </li>
            <li className="list-item">
              <p><span className="font-bold">Duration: </span>2 weeks</p>
            </li>
            <li className="list-item">
              <p>
                <span className="font-bold">Contribution: </span> 
                Created a QR Scanner component using ZXing scanner library in Angular.  
                Created gallery component for viewing scanned QR code images.
                Created initial backend functionalities in swagger.
              </p>
            </li>
          </ul>
        </div>
        <div className='px-6 pt-4 pb-2 text-end'>
          <span className="inline-block bg-orange-900 rounded-full px-3 py-1 text-sm font-semibold
            text-gray-300 mr-2 mb-2"> C#
          </span>
          <span className="inline-block bg-orange-900 rounded-full px-3 py-1 text-sm font-semibold
            text-gray-300 mr-2 mb-2"> ASP.NET
          </span>
          <span className="inline-block bg-orange-900 rounded-full px-3 py-1 text-sm font-semibold
            text-gray-300 mr-2 mb-2"> Angular
          </span>
          <span className="inline-block bg-orange-900 rounded-full px-3 py-1 text-sm font-semibold
            text-gray-300 mr-2 mb-2"> IgniteUI
          </span>
          <span className="inline-block bg-orange-900 rounded-full px-3 py-1 text-sm font-semibold
            text-gray-300 mr-2 mb-2"> TailwindCSS
          </span>
          <span className="inline-block bg-orange-900 rounded-full px-3 py-1 text-sm font-semibold
            text-gray-300 mr-2 mb-2"> Swagger
          </span>
        </div>
      </section>
    </div>
  );
}