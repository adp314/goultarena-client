
async function fetchUsers() {

  try {
    const res = await fetch(
      `http://localhost:4000/api/user/publicsubfetch?sub=${user?.sub}`,
      {
        method: "GET",
      }
    );
    const resJSON = await res.json();
  } catch (err) {
    console.log(err);
  }
}

export default fetchUsers;
