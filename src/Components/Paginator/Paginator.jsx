/* This example requires Tailwind CSS v2.0+ */
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'

export default function Paginator({filter, actualPage, totalPages, pageSize, navigateCallBack}) {

    const navigatePage = (toPage) => {
        console.log("PAGINATOR: navigating to page: " + toPage);
        navigateCallBack(toPage);
    }

    // const generateButtons = () => {
    //     let htmlStr = "";
    //     for (let i = 0; i < totalPages; i++) {
    //         htmlStr += '<a  href="#" ' + (i == actualPage? "aria-current='page'" : "") + ' className=' + (i == actualPage + 1 ? '"z-10 bg-indigo-50 border-indigo-500 text-indigo-600"' : '"bg-white border-gray-300 text-gray-500 hover:bg-gray-50"') + '" relative inline-flex items-center px-4 py-2 border text-sm font-medium">1</a>"';
    //     }
    //     return htmlStr;
    // }

    let htmlStr = [];
    let centerButton = false;
    for (let i = 0; i < totalPages; i++) {
        if (i > 2 && i < totalPages - 3) {
            if (!centerButton) {
                htmlStr = [...htmlStr, <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">{"..."}</span>];
                centerButton = true;    
            }
        } else {
            htmlStr = [...htmlStr, <a  href="#"  onClick={() => navigatePage(i)} className={(i == actualPage ? '"z-10 bg-indigo-50 border-indigo-500 text-indigo-600"' : '"bg-white border-gray-300 text-gray-500 hover:bg-gray-50"') + " relative inline-flex items-center px-4 py-2 border text-sm font-medium"}>{i+1}</a>];
        }
    }

  return (
    (filter == "all") && 
    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"> {/* fixed bottom-0 w-full */}
      <div className="flex-1 flex justify-between sm:hidden">
        <a
          href="#"
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          onClick={() => navigatePage(actualPage - 1)}
        >
          Previous
        </a>
        <a
          href="#"
          className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          onClick={() => navigatePage(actualPage + 1)}
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{actualPage*pageSize + 1}</span> to <span className="font-medium">{(actualPage+1)*pageSize}</span> of{' '}
            <span className="font-medium">{totalPages*pageSize}</span> results
          </p>
        </div>
        <div>
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <a
              href="#"
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              onClick={() => navigatePage(actualPage - 1)}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </a>
            {/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}
            {/* Generamos dinamicamente */} 
            {htmlStr}
            <a
              href="#"
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              onClick={() => navigatePage(actualPage + 1)}
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </a>
          </nav>
        </div>
      </div>
    </div>
  )
}