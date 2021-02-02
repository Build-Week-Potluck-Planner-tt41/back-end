# back-end

BASE_URL: "https://backend-potlucks.herokuapp.com/api"

---

## Endpoints:

### USERS

---

/// SIGN-UP USER ///

#### [POST] "/auth/sign-up"

name: "string" | *required*  | *unique string* |

password: "string" | *required* |

role: "organizer" or "guest" | *required* |

*success returns list of users with that role.*

---

///LOGIN USER///

#### [POST] "/auth/login"

name: "string" | *required*  | *unique string* |

password: "string" | *required*

role: "organizer" or "guest" | *required* |

success returns message and token |

*token remains valid for 1 hour*

---

### GUESTS

---

///GET GUESTS///

#### [GET] "/guests"

| *Valid token required.* | *Only organizers can access* | 

*returns array of guest objects*

---

///GET GUEST BY ID///

#### [GET] "/guests/:id"

| *Valid token required.* |  

*returns guest with valid id*

---

///GET POTLUCK BY GUEST///

#### [GET] "/guests/:id/potlucks"

| *Valid token required.* |  

*returns potlucks associated with guest id*

---

### ORGANIZERS

___

///GET ORGANIZERS///

#### [GET] "/organizers"

| *Valid token required.* | *Only organizers can access* | 

*returns array of organizer objects*

---

///GET ORGANIZER BY ID///

#### [GET] "/organizers/:id"

| *Valid token required.* | *Only organizers can access* |  

*returns organizer with valid id*

---

///GET POTLUCK BY ORGANIZER///

#### [GET] "/organizers/:id/potlucks"

| *Valid token required.* |  

*returns potlucks managed by organizer with specific id*

---

### POTLUCKS

---

///GET POTLUCKS///

#### [GET] "/potlucks"

| *valid token required* | 

*returns all potlucks*

---

///GET POTLUCK BY ID///

#### [GET] "/potlucks/:id"

| *valid token required* | *requires valid potluck_id* |

*returns potluck with specific potluck_id*

---

///GET CONFIRMED GUEST FOR A POTLUCK///

#### [GET] "/potlucks/:id/guests/confirmed"

| *valid token required* | *requires valid potluck_id* |

*returns all guests who have confirmed that they are coming who are associated with given potluck_id*

---

///GET UNCONFIRMED GUEST FOR A POTLUCK///

#### [GET] "/potlucks/:id/guests/unconfirmed"

| *valid token required* | *requires valid potluck_id* |

*returns all guests who have not confirmed that they are coming to potluck with given potluck_id*

---

///GET DESIRED FOODS FOR A POTLUCK///

#### [GET] "/potlucks/:id/foods/desired"

| *valid token required* | *requires valid potluck_id* |

*returns all desired foods set by organizer associated with given potluck_id*

---

///GET CONFIRMED FOODS FOR A POTLUCK///

#### [GET] "/potlucks/:id/foods/confirmed"

| *valid token required* | *requires valid potluck_id* |

*returns all foods confirmed to be coming to potluck with given potluck_id*

---

///CONFIRM GUESTS FOR POTLUCK///

#### [POST] "/potlucks/:id/guests/:guest_id/confirm"

| *valid token required* | *requires valid potluck_id* | *requires valid guest_id* |

*confirms guest with guest_id to be coming to potluck with given potluck_id*

---

///ADD DESIRED FOODS TO POTLUCK///

#### [POST] "/potlucks/:id/foods/desired/add"

food: "string" | *required* | 

|*valid token required* | *requires valid potluck_id* | *restricted to organizers* |

*adds desired foods to potluck with given potluck_id*

---

///ADD CONFIRMED FOODS TO POTLUCK///

#### [POST] "/potlucks/:id/guests/:guest_id/foods/add"

food: "string" | *required* | 

| *valid token required* | *requires valid potluck_id* | *requires valid guest_id* |

*adds confirmed food to potluck with given potluck_id*

*returns food and guest associated with it—note, if guest has not already confirmed, this automatically confirms that they are coming.*

---

///ADD NEW POTLUCK///

#### [POST] "/potlucks"

name: "string" | *required* | 
time: "string | *required* |
date: "string | *required* |
location: "string | *required* |
organizer_id: num | *required* |


| *valid token required* | *only organizers can access* | 

*Returns all potlucks*

---

///INVITE GUEST///

#### [POST] "/potlucks/:id/guests"

guest_id: num | *required* | 

| *valid token required* | *only organizers can access* | *valid potluck_id required* |

*Returns success message*

---







