```
Users: {
    $userID: {
        postalCode: string,
        favorites: [
            petfinderID: petfinderID
        ],
        viewed: [
            {
                sequenceStart: petfinderID,
                sequenceEnd: petfinderID,
            }
        ],
        likes: {
            breeds: {
                $name: count
            },
            sizes: {
                $size: count
            },
            genders: {
                $gender: count
            }
        },
        dislikes: {
            breeds: {
                $name: count
            },
            sizes: {
                $size: count
            },
            genders: {
                $gender: count
            }
        },
    }
}
```