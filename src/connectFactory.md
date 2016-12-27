<a name="default"></a>

## default(WrapperComponent) ⇒ <code>function</code>
This will turn your component into a HoC that
is of the form:

```
function(WrapperComponent) :-> [returned] function(options) :-> function(props) :-> Component
```

Usage:

```js
import hocFactory from 'react-hocs/hocFactory';
import MyComponent from '../components/MyComponent';
export default hocFactory(MyComponent);
```

**Kind**: global function  
**Returns**: <code>function</code> - - Returns function(options) :-> function(Component) :-> Component  

| Param | Type | Description |
| --- | --- | --- |
| WrapperComponent | <code>Component</code> | The component you wish to turn into a HoC |

