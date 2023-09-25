const Message = ({ message }) => {
  return (
    <div className="message">
      <p>{message.text}</p>
      <span>{message.user}</span>
    </div>
  );
};

export default Message;