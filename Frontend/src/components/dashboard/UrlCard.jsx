import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteUrl } from '../../api/deleteShortUrl.api';
import { toast } from 'sonner';
import { CountdownToast } from '../ui/CustomSonner';

const UrlCard = ({id, urlData, index }) => {
  const [copied, setCopied] = useState(false);
  const backendUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
  const queryClient = useQueryClient()
  const refClock = useRef()
  const [isDeleting, setIsDeleting] = useState(false)

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

   function urlDeletion(id){

    setIsDeleting(c => !c)
    
    if(refClock.current){
        clearTimeout(refClock.current)
        refClock.current = 0
        toast.dismiss(`delete-${id}`)
        toast.success('Deletion cancelled')
        return
      }

      function handleUndo() {
        setIsDeleting(c => !c)
        clearTimeout(refClock.current)
        refClock.current = 0;
        toast.dismiss(`delete-${id}`)
        toast.success('Deletion Cancelled')
      }
      
      toast.custom((t) => { console.log('first'); return <CountdownToast onUndo={handleUndo} initialTime={5} t={t} />}, 
    {
      id: `delete-${id}`,
      duration: Infinity
    } )
      
      
      refClock.current = setTimeout(() => {
        deleteMutation.mutate(id)
        toast.dismiss(`delete-${id}`)
      },5000)
      
    }
    
    const deleteMutation = useMutation({
        mutationFn: (id) => deleteUrl(id),

        onMutate: () => {
          const toastId = toast.loading("Deleting")
          return toastId
        },
        
        onSuccess: (data, context) => {
          queryClient.invalidateQueries(['userUrls'])
          toast.dismiss(context.toastId)
          toast.success("Deleted successfully")
          console.log(data)
        },
        
        onError: (error, context) => {
          toast.dismiss(context.toastId)
          toast.error("Deletion failed")
          console.log("error" ,error)
          console.log(error.response?.data?.message)
        }
      })  
  

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      
      className="border-2 border-slate-200 rounded-xl p-5 hover:shadow-lg hover:border-slate-300 transition-all duration-300 bg-linear-to-br from-white to-slate-50"
    >
    <div className=' '> 
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 ">
        
        {/* URL Info */}
        <div className="md:col-span-7 space-y-3 ">
          {/* Original URL */}
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">
              Original URL
            </p>
            <a
              href={urlData.fullUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-slate-700 hover:text-blue-600 transition-colors line-clamp-1"
              title={urlData.fullUrl}
            >
              {urlData.fullUrl}
            </a>
          </div>

          {/* Short URL */}
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">
              Short URL
            </p>
            <div className="flex items-center space-x-2">
              <a
                href={`${backendUrl}/${urlData.shortUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:text-blue-800 font-mono font-semibold hover:underline"
              >
                {backendUrl.replace(/^https?:\/\//, '')}/{urlData.shortUrl}
              </a>
              <button
                onClick={() => copyToClipboard(`${backendUrl}/${urlData.shortUrl}`)}
                className="p-1.5 hover:bg-blue-50 rounded-lg transition-colors group"
                title="Copy to clipboard"
              >
                {copied ? (
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 text-slate-400 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        
        <div className=' md:col-span-5 flex flex-col items-end space-y-2 '>
          <motion.span
            whileTap={{scale:0.8}}
            whileHover={{ scale: 1.3}}
            onClick={() => urlDeletion(id)}
            className= {` ${isDeleting ? 'bg-red-600/80 text-white px-1.5 py-1 rounded-full cursor-pointer' : 'hover:text-red-500 text-gray-400 transition-all ease-in-out cursor-pointer'} `}
           >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"  
              className="size-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>
            {/* <DeleteButton /> */}
          </motion.span>
            

          {/* Analytics */}
          <div className="md:col-span-5 flex items-center justify-between md:justify-end space-x-6 ">
                  
            {/* Clicks */}
            <div className="text-center">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">
                Clicks
              </p>
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                </svg>
                <p className="text-3xl font-bold text-slate-900">
                  {urlData.clicks || 0}
                </p>
              </div>
            </div>

            {/* Created Date */}
            <div className="text-center">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">
                Created
              </p>
              <p className="text-xs text-slate-600">
                {formatDate(urlData.createdAt)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </motion.div>
  );
};

export default UrlCard;