// import React, { useEffect, useState } from "react";
// import { useAuth } from "../context/authContext";

// // ✅ Post interface (matching your backend model)
// export interface Post {
//   _id: string;
//   title: string;
//   content: string;
//   author:
//     | {
//         _id: string;
//         email?: string;
//       }
//     | string; // can be either an ID or populated object
//   imageURL?: string;
//   tags?: string[];
//   createdAt?: string;
//   updatedAt?: string;
// }

// function Home() {
//   const { user } = useAuth();
//   const [posts, setPosts] = useState<Post[]>([]); // ✅ properly typed
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string>("");

//   console.log("Current User:", user);

//   // ✅ Logout function
//   const handleLogout = () => {
//     console.log("User logged out");
//     localStorage.removeItem("accessToken");
//     window.location.href = "/login";
//   };

//   // ✅ Fetch posts from backend
//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const token = localStorage.getItem("accessToken");

//         const res = await fetch("http://localhost:5000/api/v1/post", {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: token ? `Bearer ${token}` : "",
//           },
//         });

//         if (!res.ok) {
//           const text = await res.text();
//           throw new Error(text || "Failed to fetch posts");
//         }

//         const data = await res.json();
//         console.log("Fetched posts:", data);

//         // Defensive check
//         const postsArray = Array.isArray(data)
//           ? data
//           : data.posts || data.data || [];

//         setPosts(postsArray);
//       } catch (err: any) {
//         console.error(err);
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPosts();
//   }, []);

//   // ✅ JSX Render
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-4xl mx-auto">
//         {/* Header Card */}
//         <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-3xl p-8 mb-8 border border-gray-100">
//           <div className="text-center">
//             <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
//               Welcome Home
//             </h2>

//             {user ? (
//               <div className="space-y-4">
//                 <div>
//                   <p className="text-sm text-gray-500 uppercase tracking-wide mb-1">
//                     Logged in as
//                   </p>
//                   <h1 className="text-xl font-semibold text-gray-800">
//                     {user.email}
//                   </h1>
//                 </div>

//                 <button
//                   onClick={handleLogout}
//                   className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2.5 rounded-xl font-medium hover:from-red-600 hover:to-red-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
//                 >
//                   <svg
//                     className="w-5 h-5"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
//                     />
//                   </svg>
//                   Logout
//                 </button>
//               </div>
//             ) : (
//               <p className="text-gray-500 mt-4">No user logged in.</p>
//             )}
//           </div>
//         </div>

//         {/* Posts Section */}
//         {user && (
//           <div>
//             <h3 className="text-2xl font-bold text-gray-800 mb-6 px-2">
//               Recent Posts
//             </h3>

//             {loading ? (
//               <div className="bg-white rounded-2xl p-12 text-center shadow-lg">
//                 <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
//                 <p className="text-gray-500">Loading posts...</p>
//               </div>
//             ) : error ? (
//               <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
//                 <p className="text-red-600 font-medium">{error}</p>
//               </div>
//             ) : posts.length === 0 ? (
//               <div className="bg-white rounded-2xl p-12 text-center shadow-lg">
//                 <svg
//                   className="w-16 h-16 text-gray-300 mx-auto mb-4"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
//                   />
//                 </svg>
//                 <p className="text-gray-500 text-lg">No posts found.</p>
//               </div>
//             ) : (
//               <div className="space-y-6">
//                 {posts.map((post) => (
//                   <article
//                     key={post._id}
//                     className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group"
//                   >
//                     {post.imageURL && (
//                       <div className="overflow-hidden">
//                         <img
//                           src={post.imageURL}
//                           alt={post.title}
//                           className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
//                         />
//                       </div>
//                     )}

//                     <div className="p-6 sm:p-8">
//                       <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-200">
//                         {post.title}
//                       </h3>

//                       <p className="text-gray-700 leading-relaxed mb-5 text-base">
//                         {post.content}
//                       </p>

//                       {post.tags && post.tags.length > 0 && (
//                         <div className="flex flex-wrap gap-2 mb-5">
//                           {post.tags.map((tag, i) => (
//                             <span
//                               key={i}
//                               className="inline-flex items-center text-sm font-medium bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 px-4 py-1.5 rounded-full border border-blue-200 hover:border-blue-300 transition-colors duration-200"
//                             >
//                               #{tag}
//                             </span>
//                           ))}
//                         </div>
//                       )}

//                       <div className="flex items-center justify-between pt-4 border-t border-gray-100">
//                         <div className="flex items-center gap-2">
//                           <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold text-sm">
//                             {typeof post.author === "object" &&
//                             post.author?.email
//                               ? post.author.email[0].toUpperCase()
//                               : "?"}
//                           </div>
//                           <p className="text-sm font-medium text-gray-700">
//                             {typeof post.author === "object"
//                               ? post.author?.email ?? "Unknown"
//                               : "Unknown"}
//                           </p>
//                         </div>

//                         <time className="text-sm text-gray-500 flex items-center gap-1.5">
//                           <svg
//                             className="w-4 h-4"
//                             fill="none"
//                             stroke="currentColor"
//                             viewBox="0 0 24 24"
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth={2}
//                               d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
//                             />
//                           </svg>
//                           {post.createdAt
//                             ? new Date(post.createdAt).toLocaleDateString(
//                                 "en-US",
//                                 {
//                                   year: "numeric",
//                                   month: "short",
//                                   day: "numeric",
//                                 }
//                               )
//                             : "Unknown date"}
//                         </time>
//                       </div>
//                     </div>
//                   </article>
//                 ))}
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Home;

import { useAuth } from "../context/authContext"
import { useNavigate } from "react-router-dom"

export default function Home() {
  const { user, setUser } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    navigate("/login")
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-100">
      <h1 className="text-4xl font-bold mb-4">
        Welcome, {user?.email || "User"}!
      </h1>
      <p className="mb-6 text-gray-700">
        You are now logged in. This is your Home page.
      </p>
      <button
        onClick={handleLogout}
        className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  )
}