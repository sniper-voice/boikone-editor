import './index.css'
import { main as classicMain } from './classic/main'
import { main } from './main'

const searchParams = new URLSearchParams(window.location.search)
if (searchParams.get('mode') === 'classic') {
    classicMain()
} else {
    main()
}
