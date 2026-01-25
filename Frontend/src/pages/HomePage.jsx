import { createShortUrlApi } from "@/api/shortUrl.api";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import UrlForm from "@/components/UrlForm"
import { Home08FreeIcons } from "@hugeicons/core-free-icons/index";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { useSelector } from "react-redux";

const Homepage = () => {
  const [url, setUrl] = useState(''); 
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [focused, setFocused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { isAuthenticated } = useSelector(state => state.auth)


   const handleSubmit = async (e) => {
     e.preventDefault();
     if (!url) return;
     setLoading(true);
     setError('');
     
     try {
       const {shortUrl , status} = await createShortUrlApi(url , isAuthenticated )  // axios call
       
       if (status === 200) {
         setError('')
         setShortUrl(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/${shortUrl}`)
        //    setTimeout(() => {
        //      setShortUrl('')
        //    }, 30000)
       } else { 
         setError('Failed to create short URL')
       }
     } catch (err) {
       setError('Network error occurred')
       setTimeout(() => {
         setError('')
       }, 15000)
       setShortUrl('')
     } finally {
       setLoading(false)
     }
   }

    const copyToClipboard = async () => {
        try {
        await navigator.clipboard.writeText(shortUrl)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
        } catch (err) {
        alert('Failed to copy!')
        }
  }

  const resetForm = () => {
    setUrl('')
    setShortUrl('')
    setError('')
    setCopied(false)
  }

  const items = [
     {
    title: "⚡️ Lightning Fast",
    description:
      "Paste, click, done. Generate short links in seconds from the homepage2 or dashboard..",
  },
  {
    title: "✨ Custom Aliases",
    description:
      "Claim your brand. Create memorable links like oorly.in/launch instead of random characters.",
  },
  {
    title: "📈 Real-Time Analytics",
    description:
      "Don't fly blind. Track total clicks and engagement instantly from your dashboard.",
  },
  {
    title: "🕹️ Total Control",
    description:
      "Manage everything in one place. Copy, organize, and delete links with a single click.",
  },
  {
    title: "🔒 Secure & Reliable",
    description:
      "Safe redirects for your users, reliable uptime for you.",
  },
  ]
    
  
  return (
 
    <div className="min-h-screen w-full z-50 bg-[#f9fafb] relative">
  {/* Diagonal Stripes Background */}
 <div
    className="absolute inset-0 z-0"
    style={{
      backgroundImage: `
        linear-gradient(to right, #d1d5db 1px, transparent 1px),
        linear-gradient(to bottom, #d1d5db 1px, transparent 1px)
      `,
      backgroundSize: "32px 32px",
      WebkitMaskImage:
        "radial-gradient(ellipse 80% 80% at 100% 0%, #000 50%, transparent 90%)",
      maskImage:
        "radial-gradient(ellipse 80% 80% at 100% 0%, #000 50%, transparent 90%)",
    }}
  />
     {/* Your Content/Components */}
    
    <div className="max-w-7xl mx-auto relative z-55 ">
        <div className="min-h-screen pt-20 md:pt-15 lg:pt-20 flex flex-col items-center gap-5 "> 
            
            <div className=" max-w-[170px] mx-auto lg:-translate-x-4 mt-0 md:mt-10 text-neutral-800 opacity-90  font-semibold  backdrop-blur-[1px] flex 
            justify-center items-center text-[8px] sm:text-sm sm:px-3  px-2 py-2 rounded-full z-100 inset-shadow-aceternity">
                Fast • Secure • Simple
            </div>

        <div>
            <div className="flex flex-col items-center  ">
                <h1 className=" max-w-sm text-6xl sm:max-w-none sm:text-5xl text-shadow-lg  md:text-8xl xl:h-28 sm:h-50 h-36 text-center bg-clip-text text-transparent 
                bg-linear-to-r from-neutral-950 via-slate-900 to-slate-700  font-sans-flex font-bold tracking-tight "> 
                    Stop sending ugly links.
                </h1>
                <h6 className="text-[10px] px-4 sm:text-xl tracking-wide sm:tracking-widest  sm:mt-2 text-center text-neutral-400 font-sans-flex">
                    Turn long, messy URLs into clean, custom links like oorly.in/brand. Free to use, easy to track.
                </h6>
            </div>

            <UrlForm  handleSubmit={handleSubmit} setFocused={setFocused} focused={focused} setLoading={setLoading} loading={loading} setUrl={setUrl} url={url} resetForm={resetForm} />
            {/* <p className=" w-full text-center text-slate-600 text-lg mt-5 tracking-wider font-semibold animate-fade-in delay-300">Create clean, shareable links in seconds</p> */}
        {error && (
          <div className=" md:max-w-2xl lg:max-w-4xl mx-auto max-w-[410px] mt-4 p-4 bg-red-50/80 backdrop-blur-sm border border-red-200 text-red-700 rounded-xl animate-in slide-in-from-top-4 duration-500 hover:bg-red-50 transition-colors">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-red-500 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-medium">{error}</span>
            </div>
          </div>
        )}
        
        {shortUrl && (
          <div className="md:max-w-2xl lg:max-w-4xl mx-auto max-w-[410px] mt-4 p-5 bg-green-50/80 backdrop-blur-sm border border-green-200 rounded-xl animate-in slide-in-from-bottom-4 duration-500 hover:bg-green-50     transition-all hover:shadow-md">
            <div className="flex items-center space-x-1 mb-3">
              <svg className="w-5 h-5 text-green-600 " fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <p className="text-green-800 font-semibold text-sm">Link created successfully!</p>
            </div>
            <div className="flex items-center space-x-3">
              <input
                type="text"
                value={shortUrl}
                readOnly
                className="flex-1 px-4 py-3 bg-white/80 backdrop-blur-sm border border-green-200 rounded-lg text-slate-700 text-sm font-mono selection:bg-green-200 hover:bg-white transition-colors focus:ring-2 focus:ring-green-300"
              />
              <button
                onClick={copyToClipboard}
                className={`px-5 py-3 rounded-lg text-sm font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 relative overflow-hidden group ${
                  copied 
                    ? 'bg-green-600 text-white shadow-lg' 
                    : 'bg-slate-900 hover:bg-slate-950 text-white shadow-md hover:shadow-lg'
                }`}
              >
                {/* <div className="absolute inset-0 bg-linear-to-r from-white/0 via-white/20 to-white/0 -translate-x-50 group-hover:translate-x-full transition-transform duration-500"></div> */}
                {copied ? (
                  <div className="flex items-center space-x-1 animate-in zoom-in duration-200">
                    <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Copied!</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-1 group-hover:scale-105 transition-all duration-200">
                    <svg className="w-4 h-4   transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <span>Copy</span>
                  </div>
                )}
              </button>
            </div>
          </div>
        )}
    </div>

</div>
    <div className="  max-w-8xl mx-auto mt-10 md:mt-40 lg:mt-0 flex flex-col items-center gap-5 min-h-screen">
            <div className="flex flex-col gap-2 items-center">
                <h1 className=" text-3xl sm:text-6xl font-sans-flex font-bold"> 
                    Features Oorly provides
                </h1>
                <h2 className=" text-sm sm:text-xl tracking-wide font-sans-flex text-neutral-500"> Key features </h2>
            </div>

             <HoverEffect items={items} className={"text-lg font-sans-flex "}/>
        
        </div>

    <div className="  mt-10 md:mt-40 lg:mt-0 p-2 min-h-screen flex flex-col items-center  gap-10">
        <span className="flex flex-col items-center gap-2">
            <h1 className="text-3xl sm:text-6xl font-bold font-sans-flex tracking-wide">See it in action</h1>
            <h2 className=" text-sm sm:text-xl tracking-wide font-sans-flex text-neutral-500"> Unlock the power of the oorly dashboard </h2>
        </span>

        <iframe
        src="https://player.cloudinary.com/embed/?cloud_name=dtg6fers0&public_id=oorly-1769297110838_mw1tex"
        width="640"
        height="360" 
        className="h-auto w-full border-8 border-neutral-200 p-2 aspect-video rounded-2xl  shadow-2xl "
        allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
        allowfullscreen
        frameborder="0"
        >

        </iframe>
    </div>  
    <footer className="min-h-30 sm:min-h-40 max-w-7xl mx-auto w-full flex flex-col items-center sm:mt-50 gap-5 pb-5 ">
         <span className="text-sm sm:text-lg tracking-tight font-semibold  text-neutral-500  text-center  "> 
            No credit card required.{" "} 
                <Link to={"/auth"} className="text-neutral-700  
                relative after:absolute after:inset-x-0 align-bottom  inline-block after:bottom-0.5 after:bg-black after:-translate-x-50 after:transition-all after:duration-250 
                transition-all duration-200 after:h-[2px] after:w-full z-10 after:-z-1 hover:after:translate-x-0
                overflow-hidden sm:text-2xl  text-[16px] 
                "> {" "} Login  </Link> 
            {" "}to use all features for free.
            
         </span>

        <div className="h-px w-full bg-linear-to-r from-transparent via-neutral-200 to-transparent " />
        <div className="flex items-center justify-center w-full text-sm sm:text-[15px] text-neutral-500 font-medium gap-2">
        
        {/* Left Side: Copyright */}
        <p>&copy;{new Date().getFullYear()} Oorly.</p>

        {/* Right Side: Credit */}
        <p className="flex items-center gap-1">
            Built by
            <a 
                href="https://github.com/LakshrajChauhan13" 
                target="_blank" 
                rel="noreferrer"
                className="text-neutral-900 tracking-tight hover:text-black transition-colors underline underline-offset-4"
            >
                Lakshraj
            </a>
        </p>
    </div>
    </footer>
         
    

    </div>

     </div>
  )
}

export default Homepage