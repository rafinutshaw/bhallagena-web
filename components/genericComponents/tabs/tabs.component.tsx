import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Tabs = ({ children, className }) => {
    const [active, setActive] = useState("");
    const router = useRouter();
    const { tab } = router.query;

    useEffect(() => {
        updateActiveTab();
    }, [tab])

    const updateActiveTab = useCallback(
        () => {
            if (!tab) return;

            const index = children.map(child => child.key).indexOf(tab);

            if (index < 0) return;
            if (typeof tab === 'string')
                setActive(tab);
        },
        [tab]
    );

    const handleClick = (e, index, cb = () => { }) => {
        e.preventDefault();

        router.push({ query: { ...router.query, tab: index } });
        setActive(index);
        cb && cb();
    }

    return (
        <div className={className}>
            <div className='flex'>
                {children.map((child, index) => (
                    <Link href="#" className={`${child.key === active ? ' border-blue-800 font-bold' : 'border-white'} border-b-2 w-full`} key={`tab-${index}`} onClick={e => handleClick(e, child.key, child.props.onClick)}>
                        <div className=' shadow h-14 flex justify-center items-center'>
                            {child.props.title}
                        </div>
                    </Link>
                ))}
            </div>
            <div >{children[active]}</div>
        </div>
    )
}

export default Tabs;