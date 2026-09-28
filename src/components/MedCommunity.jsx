import React, { useState } from 'react';
import { 
  MessageSquare, 
  ThumbsUp, 
  CheckCircle, 
  Send, 
  PlusCircle, 
  Share2, 
  BookOpen, 
  HelpCircle
} from 'lucide-react';
import { FORUM_POSTS } from '../data/mockData';

export default function MedCommunity() {
  const [posts, setPosts] = useState(FORUM_POSTS);
  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'questions' | 'articles'
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState('General Medicine');
  const [isDoctorArticle, setIsDoctorArticle] = useState(false);
  const [activeCommentPostId, setActiveCommentPostId] = useState(null);
  const [commentText, setCommentText] = useState('');

  const handleUpvote = (postId) => {
    setPosts(posts.map(p => {
      if (p.id === postId) {
        return { ...p, upvotes: p.upvotes + 1 };
      }
      return p;
    }));
  };

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const newPost = {
      id: `post-${Date.now()}`,
      authorName: isDoctorArticle ? 'Dr. Aman Sharma (Verified)' : 'Aman Sharma',
      authorRole: isDoctorArticle ? 'Medical Practitioner' : 'Patient / Student',
      authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      title: newTitle,
      content: newContent,
      category: newCategory,
      createdAt: 'Just now',
      upvotes: 1,
      commentsCount: 0,
      isArticle: isDoctorArticle
    };

    setPosts([newPost, ...posts]);
    setNewTitle('');
    setNewContent('');
    setShowNewPostModal(false);
  };

  const filteredPosts = posts.filter(p => {
    if (activeFilter === 'questions') return !p.isArticle;
    if (activeFilter === 'articles') return p.isArticle;
    return true;
  });

  return (
    <section className="community-clean-section">
      <div className="container">
        <div className="section-header-clean">
          <span className="badge badge-teal" style={{ marginBottom: '8px' }}>
            Clinical & Community Knowledge Exchange
          </span>
          <h2>MedBridge Community & Verified Answers</h2>
          <p>
            An open forum where patients post real symptoms, certified doctors write clinical articles, and specialists answer queries with verified clinical advice.
          </p>
        </div>

        {/* Toolbar */}
        <div className="community-toolbar clean-card">
          <div className="tab-pills-row">
            <button 
              className={`c-tab-pill ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              All Topics ({posts.length})
            </button>
            <button 
              className={`c-tab-pill ${activeFilter === 'questions' ? 'active' : ''}`}
              onClick={() => setActiveFilter('questions')}
            >
              <HelpCircle size={14} />
              <span>Patient Inquiries</span>
            </button>
            <button 
              className={`c-tab-pill ${activeFilter === 'articles' ? 'active' : ''}`}
              onClick={() => setActiveFilter('articles')}
            >
              <BookOpen size={14} />
              <span>Doctor Articles</span>
            </button>
          </div>

          <button className="btn-teal post-topic-btn" onClick={() => setShowNewPostModal(true)}>
            <PlusCircle size={15} />
            <span>Post Problem or Article</span>
          </button>
        </div>

        {/* Posts Feed */}
        <div className="clean-posts-feed">
          {filteredPosts.map((post) => (
            <div key={post.id} className="clean-post-card clean-card">
              {/* Author Bar */}
              <div className="post-header-bar">
                <div className="author-id-box">
                  <img src={post.authorAvatar} alt={post.authorName} className="author-photo" />
                  <div>
                    <div className="author-name-tag">
                      <span className="name-bold">{post.authorName}</span>
                      {post.isArticle && (
                        <span className="badge badge-teal" style={{ fontSize: '0.65rem', padding: '1px 6px' }}>
                          Doctor Article
                        </span>
                      )}
                    </div>
                    <span className="author-sub">{post.authorRole} • {post.createdAt}</span>
                  </div>
                </div>

                <span className="badge badge-slate">{post.category}</span>
              </div>

              {/* Title & Body */}
              <h3 className="post-headline">{post.title}</h3>
              <p className="post-body-text">{post.content}</p>

              {/* Verified Answer (if present) */}
              {post.verifiedAnswer && (
                <div className="clean-solution-box">
                  <div className="solution-head">
                    <img src={post.verifiedAnswer.doctorAvatar} alt="Doctor" className="doc-avatar-sm" />
                    <div>
                      <div className="verified-flag">
                        <CheckCircle size={12} color="#059669" />
                        <span>{post.verifiedAnswer.badge}</span>
                      </div>
                      <span className="answering-doc-name">{post.verifiedAnswer.doctorName}</span>
                    </div>
                  </div>
                  <p className="solution-answer-body">{post.verifiedAnswer.answer}</p>
                </div>
              )}

              {/* Footer Interactivity */}
              <div className="post-action-footer">
                <div className="actions-left">
                  <button 
                    className="action-link-btn"
                    onClick={() => handleUpvote(post.id)}
                  >
                    <ThumbsUp size={14} />
                    <span>Helpful ({post.upvotes})</span>
                  </button>

                  <button 
                    className="action-link-btn"
                    onClick={() => setActiveCommentPostId(activeCommentPostId === post.id ? null : post.id)}
                  >
                    <MessageSquare size={14} />
                    <span>Responses ({post.commentsCount})</span>
                  </button>
                </div>

                <button 
                  className="action-link-btn"
                  onClick={() => alert('Post link copied to clipboard!')}
                >
                  <Share2 size={14} />
                  <span>Share</span>
                </button>
              </div>

              {/* Comment Drawer */}
              {activeCommentPostId === post.id && (
                <div className="clean-comment-box">
                  <input 
                    type="text"
                    placeholder="Contribute your experience or guidance..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="comment-field"
                  />
                  <button 
                    className="btn-teal send-btn"
                    onClick={() => {
                      if (!commentText.trim()) return;
                      alert('Your response has been published to this discussion.');
                      setCommentText('');
                    }}
                  >
                    <Send size={13} />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Modal */}
        {showNewPostModal && (
          <div className="modal-overlay" onClick={() => setShowNewPostModal(false)}>
            <div className="modal-content-clean" onClick={(e) => e.stopPropagation()}>
              <h3 style={{ marginBottom: '14px', fontSize: '1.3rem' }}>Post to Community</h3>

              <form onSubmit={handleCreatePost} className="new-topic-form">
                <div className="type-select-pills">
                  <button
                    type="button"
                    className={`type-pill ${!isDoctorArticle ? 'active' : ''}`}
                    onClick={() => setIsDoctorArticle(false)}
                  >
                    <HelpCircle size={14} />
                    <span>Patient Health Problem</span>
                  </button>
                  <button
                    type="button"
                    className={`type-pill ${isDoctorArticle ? 'active' : ''}`}
                    onClick={() => setIsDoctorArticle(true)}
                  >
                    <BookOpen size={14} />
                    <span>Doctor Health Article</span>
                  </button>
                </div>

                <div className="form-item">
                  <label>Title / Question Summary</label>
                  <input 
                    type="text" 
                    required 
                    placeholder={isDoctorArticle ? "e.g. 5 Warning Signs of High Blood Pressure in Young Adults" : "e.g. 3 days dry cough and night fever"}
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="clean-field"
                  />
                </div>

                <div className="form-item">
                  <label>Department Category</label>
                  <select 
                    value={newCategory} 
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="clean-field"
                  >
                    <option value="General Medicine">General Medicine</option>
                    <option value="Cardiology">Cardiology</option>
                    <option value="Dermatology">Dermatology</option>
                    <option value="Neurology">Neurology</option>
                    <option value="Student Wellness">Student Wellness & Mental Health</option>
                    <option value="Orthopedics">Orthopedics</option>
                  </select>
                </div>

                <div className="form-item">
                  <label>Detailed Description</label>
                  <textarea 
                    rows={4}
                    required
                    placeholder="Describe symptoms, duration, and any existing prescriptions..."
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    className="clean-field"
                    style={{ resize: 'vertical' }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
                  <button type="button" className="btn-secondary" onClick={() => setShowNewPostModal(false)} style={{ flex: 1 }}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-teal" style={{ flex: 1 }}>
                    Publish Post
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .community-clean-section {
          padding: 30px 0 60px;
          background: #ffffff;
        }

        .community-toolbar {
          padding: 14px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
          flex-wrap: wrap;
          gap: 12px;
        }

        .tab-pills-row {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .c-tab-pill {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          border-radius: var(--radius-full);
          background: #f8fafc;
          border: 1px solid var(--border-light);
          color: var(--text-muted);
          font-size: 0.8rem;
          font-weight: 500;
        }
        .c-tab-pill:hover {
          color: var(--text-main);
        }
        .c-tab-pill.active {
          background: var(--teal-50);
          color: var(--teal-700);
          border-color: var(--teal-200);
          font-weight: 600;
        }

        .post-topic-btn {
          font-size: 0.82rem;
          padding: 7px 16px;
        }

        .clean-posts-feed {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .clean-post-card {
          padding: 24px;
        }

        .post-header-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
        }

        .author-id-box {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .author-photo {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          object-fit: cover;
          border: 1px solid var(--border-light);
        }

        .author-name-tag {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .name-bold {
          font-size: 0.92rem;
          font-weight: 700;
          color: var(--text-main);
        }

        .author-sub {
          font-size: 0.74rem;
          color: var(--text-muted);
          display: block;
        }

        .post-headline {
          font-size: 1.15rem;
          color: var(--text-main);
          margin-bottom: 8px;
        }

        .post-body-text {
          font-size: 0.88rem;
          color: var(--text-body);
          line-height: 1.55;
          margin-bottom: 16px;
        }

        .clean-solution-box {
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          border-radius: var(--radius-md);
          padding: 14px 16px;
          margin-bottom: 16px;
        }

        .solution-head {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 8px;
        }

        .doc-avatar-sm {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          object-fit: cover;
          border: 1px solid #059669;
        }

        .verified-flag {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 0.68rem;
          color: #047857;
          font-weight: 700;
          text-transform: uppercase;
        }

        .answering-doc-name {
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--text-main);
        }

        .solution-answer-body {
          font-size: 0.84rem;
          color: var(--text-body);
          line-height: 1.5;
        }

        .post-action-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 12px;
          border-top: 1px solid var(--border-subtle);
        }

        .actions-left {
          display: flex;
          gap: 12px;
        }

        .action-link-btn {
          display: flex;
          align-items: center;
          gap: 5px;
          background: transparent;
          color: var(--text-muted);
          font-size: 0.78rem;
          font-weight: 500;
          padding: 4px 8px;
          border-radius: 4px;
        }
        .action-link-btn:hover {
          color: var(--teal-700);
          background: var(--teal-50);
        }

        .clean-comment-box {
          margin-top: 12px;
          display: flex;
          gap: 8px;
        }

        .comment-field {
          flex: 1;
          border: 1px solid var(--border-light);
          background: #f8fafc;
          padding: 7px 12px;
          border-radius: var(--radius-sm);
          font-size: 0.84rem;
          outline: none;
        }

        .send-btn {
          padding: 6px 14px;
        }

        .new-topic-form {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .type-select-pills {
          display: flex;
          gap: 8px;
        }

        .type-pill {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          background: #f8fafc;
          border: 1px solid var(--border-light);
          padding: 8px;
          border-radius: var(--radius-sm);
          font-size: 0.82rem;
          color: var(--text-muted);
        }
        .type-pill.active {
          background: var(--teal-50);
          color: var(--teal-700);
          border-color: var(--teal-200);
          font-weight: 600;
        }
      `}</style>
    </section>
  );
}
