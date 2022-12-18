import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/use_axios_private";
import './users.module.scss'

const Users = () => {
    const [users, setUsers] = useState<any[]>();
    const axiosPrivate = useAxiosPrivate();


    useEffect(() => {
        let isMounted = true;
        //? we cancel our request if the components unmounts
        const controller = new AbortController();

        const getUsers = async () => {
            try {
                const response = await axiosPrivate.get('/users', {
                    signal: controller.signal
                });

                console.log(response.data);

                //? if (isMounted) setUsers(response.data);
                isMounted && setUsers(response.data);

            } catch (err: any) {
                // if (err?.name === 'CanceledError') {
                //     console.log('Canceled', err.code);
                // } else {
                console.error(err);
                // }
            }
        }
        getUsers();
        return () => {
            isMounted = false;
            controller.abort();
        };
    }, []);


    return (
        <article>
            <h2>Users list</h2>
            {users?.length ?
                (
                    <ul>
                        {users.map((user, i) =>
                        (
                            <li key={i}>
                                {user?.username}
                            </li>)
                        )}
                    </ul>
                ) : <p>no user to display</p>}
        </article>
    );
}

export default Users;
