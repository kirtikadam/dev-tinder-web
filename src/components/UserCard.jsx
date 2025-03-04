const UserCard = ({user}) => {
  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure>
        <img src={user?.photoURL} alt="User photo" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{user?.firstName + " " + user?.lastName}</h2>
        {user?.age && user?.gender && <p>{user?.age + ", " + user?.gender}</p>}
        <p>{user?.about}</p>
        <div className="card-actions justify-center">
          <button className="btn btn-secondary">Ignore</button>
          <button className="btn btn-primary">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
