import React, { useState } from 'react';
import './EmojiGallery.css';
import { handleDownload } from '../services/emojiService';

const EmojiGallery = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [activeCategory, setActiveCategory] = useState('smileys');

  const emojiCategories = {
    smileys: {
      name: 'Smileys & Emotion',
      emojis: [
        { id: 1, name: 'Grinning Face', emoji: '😀', tags: ['happy', 'smile'] },
        { id: 2, name: 'Grinning Face with Big Eyes', emoji: '😃', tags: ['happy', 'joy'] },
        { id: 3, name: 'Grinning Face with Smiling Eyes', emoji: '😄', tags: ['happy', 'laugh'] },
        { id: 4, name: 'Beaming Face with Smiling Eyes', emoji: '😁', tags: ['happy', 'grin'] },
        { id: 5, name: 'Grinning Squinting Face', emoji: '😆', tags: ['happy', 'laugh'] },
        { id: 6, name: 'Grinning Face with Sweat', emoji: '😅', tags: ['happy', 'sweat'] },
        { id: 7, name: 'Rolling on the Floor Laughing', emoji: '🤣', tags: ['laugh', 'rofl'] },
        { id: 8, name: 'Face with Tears of Joy', emoji: '😂', tags: ['laugh', 'joy'] },
        { id: 9, name: 'Slightly Smiling Face', emoji: '🙂', tags: ['smile'] },
        { id: 10, name: 'Upside-Down Face', emoji: '🙃', tags: ['silly'] },
        { id: 11, name: 'Winking Face', emoji: '😉', tags: ['wink'] },
        { id: 12, name: 'Smiling Face with Smiling Eyes', emoji: '😊', tags: ['happy', 'blush'] },
        { id: 13, name: 'Smiling Face with Halo', emoji: '😇', tags: ['angel'] }
      ]
    },
    love: {
      name: 'Love & Hearts',
      emojis: [
        { id: 14, name: 'Red Heart', emoji: '❤️', tags: ['love', 'red'] },
        { id: 15, name: 'Orange Heart', emoji: '🧡', tags: ['love', 'orange'] },
        { id: 16, name: 'Yellow Heart', emoji: '💛', tags: ['love', 'yellow'] },
        { id: 17, name: 'Green Heart', emoji: '💚', tags: ['love', 'green'] },
        { id: 18, name: 'Blue Heart', emoji: '💙', tags: ['love', 'blue'] },
        { id: 19, name: 'Purple Heart', emoji: '💜', tags: ['love', 'purple'] },
        { id: 20, name: 'Brown Heart', emoji: '🤎', tags: ['love', 'brown'] },
        { id: 21, name: 'Black Heart', emoji: '🖤', tags: ['love', 'black'] },
        { id: 22, name: 'White Heart', emoji: '🤍', tags: ['love', 'white'] },
        { id: 23, name: 'Sparkling Heart', emoji: '💖', tags: ['love', 'sparkle'] },
        { id: 24, name: 'Growing Heart', emoji: '💗', tags: ['love', 'growing'] }
      ]
    },
    animals: {
      name: 'Animals',
      emojis: [
        { id: 25, name: 'Dog Face', emoji: '🐶', tags: ['dog', 'pet'] },
        { id: 26, name: 'Cat Face', emoji: '🐱', tags: ['cat', 'pet'] },
        { id: 27, name: 'Mouse Face', emoji: '🐭', tags: ['mouse', 'pet'] },
        { id: 28, name: 'Hamster Face', emoji: '🐹', tags: ['hamster', 'pet'] },
        { id: 29, name: 'Rabbit Face', emoji: '🐰', tags: ['rabbit', 'bunny'] },
        { id: 30, name: 'Fox Face', emoji: '🦊', tags: ['fox'] },
        { id: 31, name: 'Bear Face', emoji: '🐻', tags: ['bear'] },
        { id: 32, name: 'Panda Face', emoji: '🐼', tags: ['panda'] },
        { id: 33, name: 'Koala Face', emoji: '🐨', tags: ['koala'] },
        { id: 34, name: 'Tiger Face', emoji: '🐯', tags: ['tiger'] },
        { id: 35, name: 'Lion Face', emoji: '🦁', tags: ['lion'] }
      ]
    },
    food: {
      name: 'Food & Drink',
      emojis: [
        { id: 36, name: 'Pizza', emoji: '🍕', tags: ['pizza', 'food'] },
        { id: 37, name: 'Burger', emoji: '🍔', tags: ['burger', 'food'] },
        { id: 38, name: 'French Fries', emoji: '🍟', tags: ['fries', 'food'] },
        { id: 39, name: 'Hot Dog', emoji: '🌭', tags: ['hotdog', 'food'] },
        { id: 40, name: 'Taco', emoji: '🌮', tags: ['taco', 'food'] },
        { id: 41, name: 'Sushi', emoji: '🍣', tags: ['sushi', 'food'] },
        { id: 42, name: 'Ice Cream', emoji: '🍦', tags: ['icecream', 'food'] },
        { id: 43, name: 'Donut', emoji: '🍩', tags: ['donut', 'food'] },
        { id: 44, name: 'Cake', emoji: '🎂', tags: ['cake', 'food'] }
      ]
    },
    nature: {
      name: 'Nature',
      emojis: [
        { id: 45, name: 'Sun', emoji: '☀️', tags: ['sun', 'weather'] },
        { id: 46, name: 'Moon', emoji: '🌙', tags: ['moon', 'night'] },
        { id: 47, name: 'Star', emoji: '⭐', tags: ['star'] },
        { id: 48, name: 'Rainbow', emoji: '🌈', tags: ['rainbow'] },
        { id: 49, name: 'Cloud', emoji: '☁️', tags: ['cloud'] },
        { id: 50, name: 'Lightning', emoji: '⚡', tags: ['lightning'] },
        { id: 51, name: 'Snowflake', emoji: '❄️', tags: ['snow'] },
        { id: 52, name: 'Christmas Tree', emoji: '🎄', tags: ['tree'] },
        { id: 53, name: 'Four Leaf Clover', emoji: '🍀', tags: ['clover'] }
      ]
    },
    objects: {
      name: 'Objects',
      emojis: [
        { id: 54, name: 'Gift', emoji: '🎁', tags: ['present'] },
        { id: 55, name: 'Balloon', emoji: '🎈', tags: ['party'] },
        { id: 56, name: 'Party Popper', emoji: '🎉', tags: ['party'] },
        { id: 57, name: 'Trophy', emoji: '🏆', tags: ['winner'] },
        { id: 58, name: 'Medal', emoji: '🏅', tags: ['award'] },
        { id: 59, name: 'Soccer Ball', emoji: '⚽', tags: ['sports'] },
        { id: 60, name: 'Basketball', emoji: '🏀', tags: ['sports'] },
        { id: 61, name: 'Football', emoji: '🏈', tags: ['sports'] },
        { id: 62, name: 'Baseball', emoji: '⚾', tags: ['sports'] }
      ]
    }
  };

  const filteredEmojis = searchTerm
    ? Object.values(emojiCategories)
        .flatMap(category => category.emojis)
        .filter(emoji =>
          emoji.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          emoji.tags.some(tag => tag.includes(searchTerm.toLowerCase()))
        )
    : emojiCategories[activeCategory].emojis;

  return (
    <div className="emoji-gallery">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search emojis..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="category-tabs">
        {Object.entries(emojiCategories).map(([key, category]) => (
          <button
            key={key}
            className={`category-tab ${activeCategory === key ? 'active' : ''}`}
            onClick={() => {
              setActiveCategory(key);
              setSearchTerm('');
            }}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="emoji-grid">
        {filteredEmojis.map(emoji => (
          <div 
            key={emoji.id} 
            className="emoji-item"
            onClick={() => setSelectedEmoji(emoji)}
          >
            <div className="emoji-preview">{emoji.emoji}</div>
            <div className="emoji-name">{emoji.name}</div>
          </div>
        ))}
      </div>

      {selectedEmoji && (
        <div className="emoji-modal">
          <div className="modal-content">
            <div className="preview-emoji">{selectedEmoji.emoji}</div>
            <h3>{selectedEmoji.name}</h3>
            <button onClick={() => handleDownload(selectedEmoji)}>
              Download PNG
            </button>
            <button onClick={() => setSelectedEmoji(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmojiGallery; 